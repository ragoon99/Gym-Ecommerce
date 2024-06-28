# Generated by Django 5.0.4 on 2024-05-27 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_customuser_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(default=987654321, max_length=14, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('s_manager', 'Sales Manager'), ('receptionist', 'Receptionist'), ('manager', 'Manager'), ('client', 'Client')], default='Client', max_length=20),
        ),
    ]
