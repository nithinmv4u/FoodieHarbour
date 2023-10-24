from rest_framework import serializers
from .models import Order  # Import your Order model from your Django app

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'product_name', 'delivery_place', 'price']
        read_only_fields = ['is_paid', 'payment_date']
        extra_kwargs = {
            # Mark order_id as not required since not available at post request, but generated at view,
            # also it should be initializes unique=true and requred at models
            'order_id': {'required': False} 
        }
