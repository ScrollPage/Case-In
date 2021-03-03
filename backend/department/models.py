from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from worker.models import Worker

class Department(models.Model):
    '''Отдел'''
    admin = models.ForeignKey(
        Worker, verbose_name='Глава отдела', related_name='admin_depart', 
        null=True, on_delete=models.SET_NULL
    )
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

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
        related_name='departments', on_delete=models.CASCADE
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
    from chat.models import Chat
    if created:
        DepartmentInfo.objects.create(depart=instance, id=instance.id)
        Chat.objects.create(depart=instance, is_chat=False, name=f'Чат отдела {instance}')
        DepMembership.objects.create(user=instance.admin, depart=instance)
        

@receiver(post_save, sender=DepMembership)
def add_to_chat(sender, instance=None, created=False, **kwargs):
    '''Удаляет из чата, выедшего из отдела'''
    if created:
        chat = instance.depart.chat
        chat.members.add(instance.user)

@receiver(pre_delete, sender=DepMembership)
def remove_from_chat(sender, instance=None, created=False, **kwargs):
    '''Удаляет из чата, выедшего из отдела'''
    chat = instance.depart.chat
    chat.members.remove(instance.user)