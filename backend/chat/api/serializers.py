from rest_framework import serializers
from django.shortcuts import get_object_or_404

from chat.models import Chat, Message

from worker.api.serializers import ShortWorkerSerializer

class MessageSerializer(serializers.ModelSerializer):
    user = ShortWorkerSerializer() 

    class Meta:
        model = Message
        fields = ['content', 'user', 'timestamp', 'url']

class ChatSerializer(serializers.ModelSerializer):
    '''Сериализация чата'''
    members = ShortWorkerSerializer(many=True)
    last_message = MessageSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = [
            'id', 'members', 'name', 'depart',
            'is_chat', 'last_message', 
        ]
        read_only_fields = ['is_chat', 'name']


class ChatCreateSerializer(serializers.ModelSerializer):
    '''Сериализация создания чата'''

    class Meta:
        model = Chat
        fields = ['id', 'members']