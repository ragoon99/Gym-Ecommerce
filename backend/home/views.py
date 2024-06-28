import json

from django.http import HttpResponse

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from accounts.models import CustomUser
from equipment.models import Equipment, OrderHistory, Sales
from equipment.serializers import SalesSerializer
from home.models import Feedback
from home.serializers import FeedbackSerializer
from utils import extract_token


def dashboard(request):
    if request.method == "GET":
        context = {}
        
        users = CustomUser.objects.all().count()
        orders = OrderHistory.objects.all().count()
        sales = Sales.objects.all().count()
        equipments = Equipment.objects.all().count()
        
        context['users'] = users
        context['orders'] = orders
        context['sales'] = sales
        context['equipments'] = equipments
        
        return HttpResponse(json.dumps(context), content_type="application/json")
        
    return Response({"error" : "Not Allowed"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_order(request, pk):
    if request.method == "GET":
        context = {}
        
        token = extract_token(request.headers["Authorization"])
        user = Token.objects.get(key=token).user
        
        try:
            sales = Sales.objects.filter(transaction=pk, user_id=user.id).all()
            serialized = SalesSerializer(sales, many=True, context={'request': request})
            
            return Response(serialized.data, status=status.HTTP_200_OK)
        except:
            return Response(context, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   
        
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer