from rest_framework import serializers
from rest_framework.exceptions import ParseError

from achieve.models import Achievement

from worker.api.serializers import ShortWorkerSerializer 

class AchievementSerializer(serializers.ModelSerializer):
    '''Сериализатор достижений'''
    user = ShortWorkerSerializer(read_only=True)
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Achievement
        fields = '__all__'
        read_only_fields = ['done', 'desc']

    def validate(self, attrs):
        data = self.context['request'].data
        if data['name'] == '1':
            return super().validate(attrs)
        raise ParseError('Only first login achieve.')
            