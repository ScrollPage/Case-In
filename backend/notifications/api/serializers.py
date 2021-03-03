from rest_framework import serializers

from notifications.models import Note

class NotificatonsSeralizer(serializers.ModelSerializer):
    '''Сериализацяи уведомления'''

    class Meta:
        model = Note
        exclude = ['user']