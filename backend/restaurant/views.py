from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Item
from .serializers import ItemSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getItems(request):
    items = Item.objects.all()
    serialiser = ItemSerializer(items, many = True)
    return Response(serialiser.data)