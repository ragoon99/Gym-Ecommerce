# Generated by Django 5.0.4 on 2024-05-19 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_customuser_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_picture',
            field=models.ImageField(default='images/profile_picture/fallback.png', upload_to='images/profile_picture/'),
        ),
    ]
