from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ActivityType (models.Model):
    id = models.IntegerField(primary_key=True, verbose_name="ID")
    name = models.CharField(max_length=100, verbose_name="nombre")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Tipo de actividad'
        verbose_name_plural = 'Tipos de actividad'
    
class Activity(models.Model):
    name = models.CharField(max_length=100)
    activity_type = models.ForeignKey(ActivityType, on_delete=models.CASCADE, )
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)  # editable=False para que no se muestre en el formulario

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

