from rest_framework import serializers

from diagram.models import DiagramTask

from worker.api.serializers import ShortWorkerSerializer

class TaskSerializier(serializers.ModelSerializer):
    '''Сериализация задач'''
    initiative = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = DiagramTask
        fields = '__all__'
