from django.db import models

from worker.models import Worker

class Achievement(models.Model):
    '''Достижение'''

    CHOICES = (
        (1, 'Начало пути'),
        (2, 'Время адаптации'),
        (3, 'Уверенный сотрудник'),
        (4, 'Полноценный член коллектива')
    )

    user = models.ForeignKey(
        Worker, verbose_name='Пользователь', 
        related_name='achievements', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    stage = models.CharField(max_length=100, choices=CHOICES)

    class Meta:
        verbose_name = 'Достижения'