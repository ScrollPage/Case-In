from rest_framework import serializers

from calendly.models import CalendlyTask

class CalendlySerializer(serializers.ModelSerializer):
    '''Сериализация задач календаря'''

    class Meta:
        model = CalendlyTask
        fields = '__all__'