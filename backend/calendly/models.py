from django.db import models

from worker.models import Worker
from department.models import Department

class CalendlyTask(models.Model):
    '''Задача в календаре'''
    depart = models.ForeignKey(
        Department, verbose_name='Отдел', 
        related_name='calendly_tasks', on_delete=models.CASCADE
    )
    datetime = models.DateTimeField('Назначенное время')
    description = models.CharField(max_length=500)

    class Meta:
        verbose_name = 'Задача в календаре'
        verbose_name_plural = 'Задачи в календаре'

class Confirmation(models.Model):
    '''Подтверждение похода на мероприятие'''
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        related_name='calendly_tasks', on_delete=models.CASCADE
    )
    task = models.ForeignKey(
        CalendlyTask, verbose_name='Мероприятие', 
        related_name='confirmations', on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Подтверждение'
        verbose_name_plural = 'Подтверждения'
        unique_together = ('user', 'task')