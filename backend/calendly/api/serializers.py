from rest_framework import serializers

from calendly.models import CalendlyTask, Confirmation


class CalendlySerializer(serializers.ModelSerializer):
    """Сериализация задач календаря"""

    going = serializers.BooleanField(read_only=True)

    class Meta:
        model = CalendlyTask
        fields = "__all__"


class ConfirmationSerializer(serializers.ModelSerializer):
    """Сериализация задач календаря"""

    class Meta:
        model = Confirmation
        exclude = ["user"]
