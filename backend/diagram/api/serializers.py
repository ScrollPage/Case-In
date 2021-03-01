from rest_framework import serializers
from rest_framework.exceptions import ParseError

from diagram.models import DiagramTask

from worker.api.serializers import ShortWorkerSerializer

class TaskSerializer(serializers.ModelSerializer):
    '''Сериализация задач'''
    initiative = ShortWorkerSerializer(read_only=True)

    class Meta:
        model = DiagramTask
        exclude = ['percentage']

    def validate(self, validated_data):
        try:
            percentage = int(validated_data['percentage'])
        except KeyError:
            pass
        except ValueError:
            raise ParseError(f'Percentage must be int not {type(percentage)}.')
        else:
            if  percentage > 100 or percentage < 0:
                raise ParseError('Percentage must be <= 100 and >= 0.')
            return super().validate(instance, vaidated_data)
