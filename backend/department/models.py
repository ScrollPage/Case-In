from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from worker.models import Worker

class Department(models.Model):
    '''Отдел'''
    admin = models.ForeignKey(
        Worker, verbose_name='Глава отдела', related_name='admin_depart', 
        null=True, on_delete=models.SET_NULL
    )
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

class DepMembership(models.Model):
    '''Членство в отделе'''
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        related_name='departments', on_delete=models.DO_NOTHING
    )
    depart = models.ForeignKey(
        Department, verbose_name='Отдел', 
        related_name='workers', on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Членство в отделе'
        verbose_name_plural = 'Членства в отделе'

@receiver(post_save, sender=Department)
def create_instances(sender, instance=None, created=False, **kwargs):
    '''Создает необходимые сущности'''
    if created:
        DepartmentInfo.objects.create(depart=instance, id=instance.id)
        DepMembership.objects.create(user=instance.admin, depart=instance)