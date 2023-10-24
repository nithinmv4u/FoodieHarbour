from rest_framework import serializers
from .models import Order  # Import your Order model from your Django app

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
