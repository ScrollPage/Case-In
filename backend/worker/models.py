from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)

from .service import create_code

class WorkerManager(BaseUserManager):
    '''Мэнэджер кастомного пользователя'''

    def create_user(self, email, first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
 
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)

        user.is_superuser = True
        user.is_active = True
        user.is_staff = True
        user.ready = True

        user.save(using=self._db)
        return user

class Worker(AbstractBaseUser, PermissionsMixin):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    registered = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    ready = models.BooleanField(default=False)
    mentor = models.ForeignKey(
        'self', verbose_name='Наставник', related_name='padawans', 
        on_delete=models.SET_NULL, null=True
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = WorkerManager()

    def __str__(self):
        return self.email
        
    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

class WorkerInfo(models.Model):
    '''Информация о пользователе'''
    user = models.OneToOneField(
        Worker, verbose_name='Работник', 
        related_name='info', on_delete=models.CASCADE
    )
    phone_number = models.CharField('Номер телефона', max_length=11, default='')
    birth_date = models.DateField(null=True)

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

class TGBotCode(models.Model):
    '''Код бота телеграмма'''
    code = models.CharField(max_length=6)
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        on_delete=models.CASCADE,
        related_name='tg_code'
    )
    chat_id = models.CharField(max_length=50, null=True)

    @classmethod
    def create_unique_code(cls, user):
        code = create_code()
        while cls.objects.filter(code=code):
            code = create_code()
        cls.objects.create(code=code, user=user)

    class Meta:
        verbose_name = 'Токен для телеграм бота'
        verbose_name_plural = 'Токены для телеграм бота'

@receiver(post_save, sender=Worker)
def create_instances(sender, instance=None, created=False, **kwargs):
    from control.models import Test
    '''Создает необходимые сущности'''
    if created:
        WorkerInfo.objects.create(user=instance, id=instance.id)
        TGBotCode.create_unique_code(instance)
        for i in range(4):
            Test.objects.create(user=instance, category=i+1)