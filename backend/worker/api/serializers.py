from rest_framework import serializers 

from worker.models import Worker, WorkerInfo, Review

class WorkerInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о работнике'''

    class Meta:
        model = WorkerInfo
        exclude = ['user']

class WorkerSerializer(serializers.ModelSerializer):
    '''Сериализация работника'''
    info = WorkerInfoSerializer(read_only=True)
    rate = serializers.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        model = Worker
        exclude = ['password', 'groups', 'user_permissions']

class ShortWorkerSerializer(serializers.ModelSerializer):
    '''Сериализация работника'''
    info = WorkerInfoSerializer(read_only=True)
    
    class Meta:
        model = Worker
        fields = ['id', 'info']

class ReviewSerializer(serializers.ModelSerializer):
    '''Сериализация отзыва'''

    class Meta:
        model = Review
        exclude = ['user']