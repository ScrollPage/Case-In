from django.db import models

from worker.models import Worker

class CalendlyTask(models.Model):
    '''Задача в календаре'''
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        related_name='calendly_tasks', on_delete=models.CASCADE
    )
    datetime = models.DateTimeField('Назначенное время')
    description = models.CharField(max_length=500)

    class Meta:
        verbose_name = 'Задача в календаре'
        verbose_name_plural = 'Задачи в календаре'

