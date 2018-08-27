from rest_framework import serializers
from Event.models import Event,Demo

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields=('id','description','date','time','preference')

class DemoSerializer(serializers.Serializer):
    class Meta:
        model=Demo
        fields=('id','descript')






