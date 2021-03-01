from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.conf import settings

from doc.models import Doc, ChatDoc

class DocSerializer(serializers.ModelSerializer):
    '''Сериализация документа'''

    class Meta:
        model = Doc
        exclude = ['timestamp']