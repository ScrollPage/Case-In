from rest_framework import serializers

from control.models import Test


class TestSerializer(serializers.ModelSerializer):
    """Сериализация теста"""

    class Meta:
        model = Test
        exclude = ["user"]
