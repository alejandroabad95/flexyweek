# Generated by Django 5.0.4 on 2024-04-24 15:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_activity_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='activity',
            options={'ordering': ['created_at'], 'verbose_name': 'Actividad', 'verbose_name_plural': 'Actividades'},
        ),
    ]
