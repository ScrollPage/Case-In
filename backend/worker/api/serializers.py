from rest_framework import serializers 

from worker.models import Worker, WorkerInfo

class WorkerInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о работнике'''

    class Meta:
        model = WorkerInfo
        exclude = ['user']

class WorkerSerializer(serializers.ModelSerializer):
    '''Сериализация работника'''
    info = WorkerInfoSerializer(read_only=True)
    class Meta:
        model = Worker
        exclude = ['password', 'groups', 'user_permissions']
