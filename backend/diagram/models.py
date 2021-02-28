from django.db import models

from worker.models import Worker

class DiagramTask(models.Model):
    '''Задания на диаграмме Ганта'''
    user = models.ForeignKey(
        Worker, verbose_name='Исполняющий', 
        on_delete=models.CASCADE, related_name='tasks'
    )
    begin_time = models.DateField()
    end_time = models.DateField()
    name = models.CharField('Название задачи', max_length=50)
    description = models.CharField('Описание задачи', max_length=200, default='')
    percentage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
