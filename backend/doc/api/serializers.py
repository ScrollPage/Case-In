from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.conf import settings

from doc.models import Doc, ChatDoc

from worker.api.serializers import ShortWorkerSerializer

class DocSerializer(serializers.ModelSerializer):
    '''Сериализация документа'''


    class Meta:
        model = Doc
        exclude = ['timestamp']

class ChatDocSerializer(serializers.ModelSerializer):
    '''Документ в чате'''
    user = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = ChatDoc
        fields = '__all__'