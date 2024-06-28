from pyexpat import model
from rest_framework import serializers

from accounts.serializers import UserSerializer
from .models import Equipment, EquipmentPictures, OrderHistory, Sales, Supplier, PurchaseLog, Discount, TransactionLog, OfflineSalesLog


class EquipmentPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentPictures
        fields = ['equipment_img']

class EquipmentSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()
    available = serializers.SerializerMethodField()
    
    class Meta:
        model = Equipment
        fields = '__all__'
        
    def get_pictures(self, obj):
        request = self.context.get('request')
        pictures = EquipmentPictures.objects.filter(equipment=obj)
        return [request.build_absolute_uri(picture.equipment_img.url) for picture in pictures if picture.equipment_img]
    
    def get_available(self, obj):
        available = EquipmentPictures.objects.filter(equipment=obj) != 0
        return available


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'


class PurchaseLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseLog
        fields = '__all__'


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'


class TransactionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionLog
        fields = '__all__'


class SalesSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    equipment = EquipmentSerializer()
    transaction = TransactionLogSerializer()
    equipment_name = serializers.SerializerMethodField()
    transaction_ref = serializers.SerializerMethodField()
    
    class Meta:
        model = Sales
        fields = '__all__'

    def get_equipment_name(self, obj):
        return str(obj.equipment)

    def get_transaction_ref(self, obj):
        return str(obj.transaction)


class OfflineSalesLogSerializer(serializers.ModelSerializer):
    transaction = TransactionLogSerializer()
    
    class Meta:
        model = OfflineSalesLog
        fields = '__all__'
        
    def create(self, validated_data):
        transaction_data = validated_data.pop('transaction')
        transaction = TransactionLog.objects.create(**transaction_data)
        offline_sales_log = OfflineSalesLog.objects.create(transaction=transaction, **validated_data)
        return offline_sales_log
        
        
class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistory
        fields = '__all__'