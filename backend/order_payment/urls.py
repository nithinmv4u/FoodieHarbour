from django.urls import path
from . import views
from .views import CreateOrderView
# from views import 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
]
