from rest_framework import serializers
from .models import Activity, ActivityType, Event

# Si cambio validaciones en serializer, las cambio en models. Ponemos validaciones por si acaso aquí también.

class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = ('id', 'name')

class ActivitySerializer(serializers.ModelSerializer):
    activity_type_name = serializers.CharField(source='activity_type.name', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'name', 'activity_type', 'activity_type_name', 'created_at', 'user']

    def validate_name(self, value):
        max_length = 30  # Máximo número de caracteres permitidos para el nombre
        if len(value) > max_length:
            raise serializers.ValidationError(f'El nombre no puede tener más de {max_length} caracteres.')
        return value
    
    def validate(self, data):
        user = data.get('user')
        if user:
            # Contar todas las actividades del usuario actual
            existing_activities_count = Activity.objects.filter(user=user).count()
            TOTAL_ACTIVITY_LIMIT = 42
            
            # Verificar si agregar esta actividad supera el límite total
            if existing_activities_count >= TOTAL_ACTIVITY_LIMIT:
                raise serializers.ValidationError(
                    f"No puedes tener más de {TOTAL_ACTIVITY_LIMIT} actividades en total.")

        return data
    

class EventSerializer(serializers.ModelSerializer):

    activity = ActivitySerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'  
