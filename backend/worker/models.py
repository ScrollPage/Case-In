from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)

class WorkerManager(BaseUserManager):
    '''Мэнэджер кастомного пользователя'''

    def create_user(self, email, password=None):
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
 
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)

        user.is_superuser = True
        user.is_active = True
        user.is_staff = True

        user.save(using=self._db)
        return user

class Worker(AbstractBaseUser, PermissionsMixin):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    registered = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'

    objects = WorkerManager()

    def __str__(self):
        return self.email
        
    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

class WorkerInfo(models.Model):
    '''Информация о пользователе'''
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        related_name='info', on_delete=models.CASCADE
    )
    phone_number = models.CharField('Номер телефона', max_length=11, default='')
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    birt_date = models.DateTimeField(null=True)

    class Meta:
        verbose_name = 'Информация о работнике'
        verbose_name_plural = 'Информация о работнике'

class Review(models.Model):
    '''Отзыв об инициативе'''
    user = models.ForeignKey(Worker, verbose_name='Автор', on_delete=models.CASCADE)
    estimated = models.ForeignKey(
        Worker, 
        verbose_name='Оцениваемый', 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )
    content = models.TextField(max_length=2000)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

@receiver(post_save, sender=Worker)
def create_instances(sender, instance=None, created=False, **kwargs):
    '''Создает необходимые сущности'''
    if created:
        WorkerInfo.objects.create(user=instance)