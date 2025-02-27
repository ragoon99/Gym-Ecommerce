# Generated by Django 5.0.4 on 2024-05-20 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0018_equipment_price_per_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sale',
            name='equipment',
        ),
        migrations.RemoveField(
            model_name='sale',
            name='sales_made_by',
        ),
        migrations.RemoveField(
            model_name='sale',
            name='transaction',
        ),
        migrations.AddField(
            model_name='transactionlog',
            name='payment_method',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transactionlog',
            name='transaction_ref',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='OnlineSale',
        ),
        migrations.DeleteModel(
            name='Sale',
        ),
    ]
