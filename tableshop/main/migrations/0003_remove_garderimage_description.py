# Generated by Django 5.2.1 on 2025-06-22 21:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_garder_garderimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='garderimage',
            name='description',
        ),
    ]
