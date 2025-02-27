# Generated by Django 5.0.4 on 2024-05-19 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipment', '0017_remove_equipment_image_equipment_thumbnail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipment',
            name='price_per',
            field=models.FloatField(default=1000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='equipmentpictures',
            name='equipment_img',
            field=models.ImageField(default='images/equipments/fallback.png', upload_to='images/equipments/'),
        ),
    ]
