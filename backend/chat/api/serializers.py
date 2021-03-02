from rest_framework import serializers
from django.shortcuts import get_object_or_404

from worker.api.serializers import ShortWorkerSerializer
from chat.models import Chat, Message
from backend.service import NameSerializer, CompanyNameSerializer

class MessageSerializer(serializers.ModelSerializer):
    user = ShortWorkerSerializer() 

    class Meta:
        model = Message
        fields = ['content', 'user', 'timestamp', 'url']

class ChatSerializer(serializers.ModelSerializer):
    '''Сериализация чата'''
    members = CompanyNameSerializer(many=True)
    last_message = MessageSerializer(read_only=True)
    is_unread_exists = serializers.BooleanField(read_only=True)
    num_unread = serializers.IntegerField(read_only=True)

    class Meta:
        model = Chat
        fields = [
            'id', 'members', 'name', 'command',
            'is_chat', 'last_message', 
            'is_unread_exists', 'num_unread',
        ]
        read_only_fields = ['is_chat', 'name']


class ChatCreateSerializer(serializers.ModelSerializer):
    '''Сериализация создания чата'''
    members = NameSerializer(many=True)

    class Meta:
        model = Chat
        fields = ['id', 'members']