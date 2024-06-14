from django.db import models
from django.contrib.auth.models import User
from django.forms import ValidationError
from django.utils import timezone

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
    name = models.CharField(max_length=30, verbose_name="nombre")
    activity_type = models.ForeignKey(ActivityType, on_delete=models.CASCADE, verbose_name="tipo" )
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False, verbose_name="usuario")  
    created_at = models.DateTimeField(default=timezone.now, verbose_name="fecha de creación") 
    # Límite total de actividades por usuario
    TOTAL_ACTIVITY_LIMIT = 42

    def save(self, *args, **kwargs):
        # Contar todas las actividades del usuario actual
        existing_activities_count = Activity.objects.filter(user=self.user).count()
        
        # Verificar si el número de actividades existentes supera el límite
        if existing_activities_count >= self.TOTAL_ACTIVITY_LIMIT:
            raise ValidationError(f"No puedes tener más de {self.TOTAL_ACTIVITY_LIMIT} actividades.")
        
        # Llamar al método save original si no se ha alcanzado el límite
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'
      
        
class Event(models.Model):
    DAY_CHOICES = [
        ('Mon', 'Lunes'),
        ('Tue', 'Martes'),
        ('Wed', 'Miércoles'),
        ('Thu', 'Jueves'),
        ('Fri', 'Viernes'),
        ('Sat', 'Sábado'),
        ('Sun', 'Domingo'),
    ]

    activity = models.ForeignKey(Activity, on_delete=models.CASCADE,verbose_name="actividad" )
    goal = models.CharField(max_length=50, verbose_name="objetivo", blank=True)
    priority = models.IntegerField(default=1, verbose_name="prioridad")
    day = models.CharField(max_length=3, choices=DAY_CHOICES, verbose_name="día")
    completed = models.BooleanField(default=False, verbose_name="completado")  # Campo booleano para evento completado
    completed_at = models.DateTimeField(null=True, blank=True)  # Fecha de completación
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)  # editable=False para que no se muestre en el formulario


    def complete_event(self):
        self.completed = True
        self.completed_at = timezone.now()
        self.save()

    # def save(self, *args, **kwargs):
    #     PRIORITY_MAX = 6

    #     if not 1 <= self.priority <= PRIORITY_MAX:
    #         raise ValidationError("La prioridad debe estar entre 1 y 6.")

       
    #     existing_event = Event.objects.filter(
    #         user=self.user,
    #         day=self.day,
    #         priority=self.priority
    #     ).exclude(pk=self.pk)  

    #     if existing_event.exists():
    #         raise ValidationError("Ya existe un evento con esta prioridad en el mismo día.")
        
        

    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.goal

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'

