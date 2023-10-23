from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    place = models.CharField(max_length=100)

    # def __str__(self) -> str:
    #     return (f"Item: {self.name} - Rs.{self.price} - {self.place}")