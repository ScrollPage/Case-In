from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from worker.models import Worker

from backend.settings import pusher_client as pusher

class Achievement(models.Model):
    '''Достижение'''

    DOMEN = 'https://business-net-pictures.s3.eu-north-1.amazonaws.com/achievements/'

    NAME_CHOICES = (
        (1, 'Начало карьеры'),
        (2, 'Мы все знаем'),
        (3, 'Большой брат'),
        (4, 'Новичок'),
        (5, 'Работяга'),
        (6, 'Гулена'),
        (7, 'Все впорядке'),
    )

    # DESCRIPTION_CHOICES = (
    #     (1, 'Зайти на сайт.'),
    #     (2, 'Полностью заполнить профиль.'),
    #     (3, 'Познакомиться с наставником.'),
    #     (4, 'Выполнить первое поручение.'),
    #     (5, 'Выполнить вовремя 10 поручений.'),
    #     (6, 'Посетить пять мероприятий.'),
    #     (7, 'Выполнить поручение в последний день.'),
    # )

    user = models.ForeignKey(
        Worker, verbose_name='Пользователь', 
        related_name='achievements', on_delete=models.CASCADE
    )
    url = models.CharField(max_length=500)
    name = models.CharField(max_length=50, choices=NAME_CHOICES)
    done = models.BooleanField(default=False)


    class Meta:
        verbose_name = 'Достижение'
        verbose_name_plural = 'Достижения'

    def set_done(self):
        self.done = True
        self.save()
        pusher.trigger(
            f'achieve{self.user.id}', 
            'new-achieve', 
            {'name': self.name, 'url': self.url}
        )