from rest_framework import serializers
from .models import Activity, ActivityType, Event

class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = ('id', 'name')

class ActivitySerializer(serializers.ModelSerializer):
    activity_type_name = serializers.CharField(source='activity_type.name', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'name', 'activity_type', 'activity_type_name', 'created_at', 'user']


class EventSerializer(serializers.ModelSerializer):

    activity_name = serializers.CharField(source='activity.name', read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'  
