from rest_framework import serializers

from feed.models import Rating

class RatingSerializer(serializers.ModelSerializer):
    '''Сериализация лайка'''

    class Meta:
        model = Rating
        fields = ['star', 'user']

    def create(self, validated_data):
        rating, _ = Rating.objects.update_or_create(
            appraiser=self.context['request'].user,
            user=validated_data.get('user', None),
            defaults={'star': validated_data.get('star')}
        )

        return rating