# Generated by Django 4.2.11 on 2024-04-30 07:13

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0011_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='recruitmentpost',
            name='image',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
