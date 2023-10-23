from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item
from .serializers import ItemSerializer

# Create your views here.
@api_view(['GET'])
def getItems(request):
    items = Item.objects.all()
    serialiser = ItemSerializer(items, many = True)
    return Response(serialiser.data)