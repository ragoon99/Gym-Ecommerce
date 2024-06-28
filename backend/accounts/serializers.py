from django.db.utils import IntegrityError

from rest_framework import serializers, status
from rest_framework.response import Response 

from .models import CustomUser

def validate_phoneNo(value):
        if len(value) != 10:
            raise serializers.ValidationError("Phone Number must be of 10 Digits")
        
class UserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(validators=[validate_phoneNo])
    
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'phone_number': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {'write_only': True}
            }

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            dob=validated_data['dob'],
            address=validated_data['address'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user
            
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['full_name'] = f"{instance.first_name} {instance.last_name}"
        
        if data['role'] == 's_manager':
            data['role'] = 'Sales Manager'
        elif data['role'] == 'manager':
            data['role'] = 'Manager'
        elif data['role'] == 'receptionist':
            data['role'] = 'Receptionist'
        elif data['role'] == 'client':
            data['role'] = 'Client'

        return data
    

class LoginSerializer(serializers.Serializer):
    model = CustomUser
    fields = ['email', 'password']