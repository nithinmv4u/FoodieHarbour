from django.db import models

# Create your models here.
class Order(models.Model):
    product_name = models.CharField(max_length=255)
    delivery_place = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    order_id = models.CharField(max_length=100, unique=True)
    payment_intent_id = models.CharField(max_length=255, unique=True)
    is_paid = models.BooleanField(default=False)
    payment_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.product_name}"

    def mark_as_paid(self, payment_intent_id, payment_date):
        self.payment_intent_id = payment_intent_id
        self.is_paid = True
        self.payment_date = payment_date
        self.save()