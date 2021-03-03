from rest_framework import serializers 

from worker.models import Worker, WorkerInfo, Review

class WorkerInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о работнике'''

    class Meta:
        model = WorkerInfo
        exclude = ['user']

class ShortWorkerSerializer(serializers.ModelSerializer):
    '''Сериализация работника'''
    info = WorkerInfoSerializer(read_only=True)
    
    class Meta:
        model = Worker
        fields = ['id', 'info', 'first_name', 'last_name']

class WorkerSerializer(serializers.ModelSerializer):
    '''Сериализация работника'''
    info = WorkerInfoSerializer(read_only=True)
    rate = serializers.DecimalField(max_digits=3, decimal_places=2)
    num_reviews = serializers.IntegerField(read_only=True)
    num_notes = serializers.IntegerField(read_only=True)
    num_tests = serializers.IntegerField(read_only=True)
    code = serializers.CharField(read_only=True)
    mentor = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = Worker
        exclude = ['password', 'groups', 'user_permissions']

class ReviewSerializer(serializers.ModelSerializer):
    '''Сериализация отзыва'''
    user = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        extra_kwargs = {
            'estimated': {'write_only': True}
        }