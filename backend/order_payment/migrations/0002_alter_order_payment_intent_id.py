# Generated by Django 4.1.5 on 2023-10-25 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order_payment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment_intent_id',
            field=models.CharField(max_length=255, null=True),
        ),
    ]