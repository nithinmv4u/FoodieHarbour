from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import stripe
from backend.settings import STRIPE_WEBHOOK_SECRET
from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer
from datetime import datetime
import random
from decimal import Decimal

endpoint_secret = STRIPE_WEBHOOK_SECRET

@csrf_exempt  # To disable CSRF protection for this view
@require_POST  # To ensure only POST requests are allowed
def stripe_webhook(request):
    payload = request.body
    event = None
    print("at webhook",payload)

    try:
        event = stripe.Event.construct_from(
            payload, stripe.api_key, endpoint_secret
        )
    except ValueError as e:
        return HttpResponse(status=400)

    if event['type'] == 'charge.refunded':
      charge = event['data']['object']
    elif event['type'] == 'payment_intent.succeeded':
      payment_intent = event['data']['object']
    else:
      print('Unhandled event type {}'.format(event['type']))

    return HttpResponse(status=200)

class PaymentIntentView(APIView):
    def generate_order_number(self):
        now = datetime.now()
        timestamp = int(now.timestamp())
        random_number = random.randint(1000, 9999)
        order_number = f'{timestamp}{random_number}'
        return order_number
    
    def post(self, request, format=None):
        product_name = request.data.get('product_name')
        product_price = request.data.get('product_price')
        delivery_place = request.data.get('delivery_place')
        print("details ItemCard: ",product_name,product_price,delivery_place)
        product_price_fils = int(Decimal(product_price) * 100)

        # Create an order in your model
        serializer = OrderSerializer(data={
            'product_name': product_name,
            'delivery_place': delivery_place,  # Adjust as needed
            'price': product_price,
        })

        if serializer.is_valid():
            order_number = self.generate_order_number()
            serializer.validated_data['order_id'] = order_number
            serializer.save()

            try:
                # Create a PaymentIntent on the server
                intent = stripe.PaymentIntent.create(
                    amount=product_price_fils,
                    currency='aed',  
                    description=f'Payment for {product_name}',
                )
                client_secret = intent.client_secret  # Get the client secret
                return Response({'client_secret': client_secret}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)