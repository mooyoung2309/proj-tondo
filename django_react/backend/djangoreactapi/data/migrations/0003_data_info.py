# Generated by Django 3.2.3 on 2021-05-18 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_auto_20210518_1553'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='info',
            field=models.JSONField(default='{}'),
        ),
    ]