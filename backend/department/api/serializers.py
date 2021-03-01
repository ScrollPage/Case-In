from rest_framework import serializers

from department.models import Department, DepartmentInfo, DepMembership
from worker.api.serializers import ShortWorkerSerializer

class DepartmentInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации отдела'''
    
    class Meta:
        model = DepartmentInfo
        exclude = ['id', 'depart']

class DepartmentSerializer(serializers.ModelSerializer):
    '''Сериализация отдела'''
    info = DepartmentInfoSerializer(read_only=True)
    num_workers = serializers.IntegerField(read_only=True)
    admin = ShortWorkerSerializer(read_only=True)
    joined = serializers.BooleanField(read_only=True)

    class Meta:
        model = Department
        fields = '__all__'
        read_only_fields = ['admin']

class DepMembershipSerializer(serializers.ModelSerializer):
    '''Сериализация членства в отделе'''

    class Meta:
        model = DepMembership
        fields = '__all__'
        read_only_fields = ['depart']

class MembersSerializer(serializers.ModelSerializer):
    '''Сериадизация членства в отделе'''
    user = ShortWorkerSerializer(read_only=True)
    depart = DepartmentSerializer(read_only=True)

    class Meta:
        model = DepMembership
        fields = '__all__'

