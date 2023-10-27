from django.urls import path
from . import views
from .views import PaymentIntentView, stripe_webhook
# from views import 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('create-order/', PaymentIntentView.as_view(), name='create-order'),
    path('stripe-webhook/', views.stripe_webhook, name='stripe-webhook'),
]
