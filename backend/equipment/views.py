import json
import requests

from django.conf import settings
from django.http import HttpRequest
from django.shortcuts import redirect
from django.core.cache import cache
from django.core.mail import send_mail

from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, api_view, action

import equipment
from equipment.utils import generate_code, generate_random_string
from utils import extract_token

from .models import (
    Equipment,
    EquipmentPictures,
    OrderHistory,
    Sales,
    Supplier,
    PurchaseLog,
    Discount,
    TransactionLog,
    OfflineSalesLog,
)
from .serializers import (
    EquipmentSerializer,
    OrderHistorySerializer,
    SalesSerializer,
    SupplierSerializer,
    PurchaseLogSerializer,
    DiscountSerializer,
    TransactionLogSerializer,
    OfflineSalesLogSerializer,
)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def purchase_history(request):
    if request.method == "GET":
        token = extract_token(request.headers["Authorization"])
        user = Token.objects.get(key=token).user
        sales = Sales.objects.filter(user=user.id)
        
        serialized = SalesSerializer(sales, many=True, context={'request': request})
        
        return Response(data=serialized.data, status=status.HTTP_200_OK)


def verify_payment(request):
    if request.method == "GET":
        data = request.GET

        if data["status"] == "Completed": 
            cache_data = cache.get(data["pidx"])

            user = Token.objects.get(key=cache_data["token"]).user

            

            send_mail(
                "Subscription",
                f"Your billing log.\n \
                Transaction ID : {data['transaction_id']}\n \
                Transaction Name : {data['purchase_order_name']}\n \
                Total Amount : {data['total_amount']}",
                settings.EMAIL_HOST_USER,
                [user.email],
            )

            info = cache_data["data"]
            
            transaction = TransactionLog(
                discount=0,
                total=0,
                transaction_ref=data["transaction_id"],
                payment_method="Khalti",
            )
            transaction.save()
            
            total_amount = 0
            for i in info[:-1]:
                equipment = Equipment.objects.get(pk=i["id"])
                sale = Sales(
                    transaction=transaction,
                    equipment=equipment,
                    quantity=i["qty"],
                    price_per=i["price_per"],
                    user=user,
                )
                equipment.count -= i["qty"]
                equipment.save(update_fields=["count"])
                sale.save()
                
                total_amount += (i["qty"] * i["price_per"])
            
            transaction.total = total_amount
            transaction.save()

            cache.delete(data["pidx"])

        return redirect(f"http://localhost:3030/purchase-success/{transaction.transaction_id}")


def validate_equipemnt(data):
    for i in data[:-1]:
        print(i)
        model = Equipment.objects.get(pk=i["id"])

        if model.count < i["qty"]:
            return False

    return True


class PaymentAPIView(views.APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        if request.method == "POST":
            url = "https://a.khalti.com/api/v2/epayment/initiate/"

            data = json.loads(request.body)
            orderNameID = generate_random_string()

            if not validate_equipemnt(data):
                return Response(
                    "Order Quantity cannot be greater than Stock Quantity", 500
                )

            product_details = []

            for item in data[:-1]:
                formatted_item = {
                    "identity": item["id"],
                    "name": item["name"],
                    "total_price": (item["qty"] * item["price_per"]) * 100 ,
                    "quantity": item["qty"],
                    "unit_price": item["price_per"],
                }
                product_details.append(formatted_item)

            payload = json.dumps(
                {
                    "return_url": f"{settings.HOSTNAME}verify-payment//",
                    "website_url": settings.HOSTNAME,
                    "amount": 100000,
                    "purchase_order_id": orderNameID,
                    "purchase_order_name": orderNameID,
                    "customer_info": {
                        "name": request.user.get_full_name(),
                        "email": request.user.email,
                        "phone": request.user.phone_number,
                    },
                    "product_details": product_details,
                }
            )

            headers = {
                "Authorization": "Key " + settings.KHALTI_SECRET_KEY,
                "Content-Type": "application/json",
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            if response.status_code == 200:
                cache_data = {
                    "token": Token.objects.get(user=request.user),
                    "data": data,
                }
                cache.set(response.json()["pidx"], cache_data, timeout=300)

                return Response(response.json(), 200)
            else:
                print(response.text)
                return Response(response.text, 403)

        return Response(200)


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

    def create(self, request: HttpRequest, *args, **kwargs):
        image_files = request.FILES.getlist("image[]")

        request.data._mutable = True
        request.data.update({"thumbnail": image_files[0]})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        for image_file in image_files:
            image = EquipmentPictures(
                equipment_img=image_file,
                equipment=Equipment.objects.get(pk=serializer.data["equipment_id"]),
            )
            image.save()

        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        request.data["supplier_code"] = generate_code(request.data["name"])

        serializer = SupplierSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=200)
        else:
            return Response(status=400)


class PurchaseLogViewSet(viewsets.ModelViewSet):
    queryset = PurchaseLog.objects.all()
    serializer_class = PurchaseLogSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class TransactionLogViewSet(viewsets.ModelViewSet):
    queryset = TransactionLog.objects.all()
    serializer_class = TransactionLogSerializer


class SalesViewSet(viewsets.ModelViewSet):
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer


class OfflineSalesLogViewSet(viewsets.ModelViewSet):
    queryset = OfflineSalesLog.objects.all()
    serializer_class = OfflineSalesLogSerializer


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = OrderHistory.objects.all()
    serializer_class = OrderHistorySerializer
    permission_classes = [IsAdminUser]
    
    def create(self, request, *args, **kwargs):
        data = super().create(request, *args, **kwargs)
        
        supplier = Supplier.objects.filter(name=request.data['supplier_name']).first()
        
        send_mail(
                "Order Request",
                f"Hello, I would like to make a request for below equipment {request.data['item_name']} x{request.data['count']} Manufractured by {request.data['manufracturer']}\n\nThank You,\nRegards,\nGym Pro Connect",
                settings.EMAIL_HOST_USER,
                [supplier.email],
            )
        
        return data
    
    @action(detail=True, methods=['patch'], url_path='order-status')
    def set_order_delivery(self, request, pk):
        order = self.get_object()
        order.status = "Delivered"
        try:
            equipment = Equipment.objects.filter(name=order.item_name, manufracturer=order.item_manufracturer)
            
            if equipment.exists():
                equipment = equipment.first()
                equipment.count += order.count
            else:
                equipment = Equipment(
                    name=order.item_name,
                    manufracturer=order.item_manufracturer,
                    count=order.count
                )
                
            equipment.save()
            order.save()
            
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
