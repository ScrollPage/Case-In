from rest_framework import serializers

from achieve.models import Achievement

class AchievementSerializer(serializers.ModelSerializer):
    '''Сериализатор достижений'''

    class Meta:
        model = Achievement
        exclude = ['user']