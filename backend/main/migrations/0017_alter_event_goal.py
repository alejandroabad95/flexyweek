# Generated by Django 5.0.4 on 2024-06-06 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_activity_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='goal',
            field=models.CharField(blank=True, max_length=50, verbose_name='objetivo'),
        ),
    ]
