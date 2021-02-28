from django.db import models

from worker.models import Worker

class Department(models.Model):
    '''Отдел'''
    admin = models.OneToOneField(
        Worker, verbose_name='Глава отдела', related_name='admin_depart', 
        null=True, on_delete=models.SET_NULL
    )
    members = models.ManyToManyField(Worker, verbose_name='Учатники')
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Отдел'
        verbose_name_plural = 'Отделы'

class DepartmentInfo(models.Model):
    '''Информация об отделе'''
    depart = models.OneToOneField(
        Department, verbose_name='Отдел', 
        related_name='info', on_delete=models.CASCADE
    )
    description = models.TextField(max_length=100)
    motto = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Информация о отделе'
        verbose_name_plural = 'Информация об отделах'