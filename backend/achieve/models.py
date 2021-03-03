from django.db import models

from worker.models import Worker

class Achievement(models.Model):
    '''Достижение'''

    NAME_CHOICES = (
        (1, 'Начало карьеры'),
        (2, 'Мы все знаем'),
        (3, 'Большой брат'),
        (4, 'Новичок'),
        (5, 'Работяга'),
        (6, 'Гулена'),
        (7, 'Все впорядке'),
    )

    DESCRIPTION_CHOICES = (
        (1, 'Зайти на сайт.'),
        (2, 'Полностью заполнить профиль.'),
        (3, 'Познакомиться с наставником.'),
        (4, 'Выполнить первое поручение.'),
        (5, 'Выполнить вовремя 10 поручений.'),
        (6, 'Посетить пять мероприятий.'),
        (7, 'Выполнить поручение в последний день.'),
    )

    user = models.ForeignKey(
        Worker, verbose_name='Пользователь', 
        related_name='achievements', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50, choices=NAME_CHOICES)
    done = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Достижение'
        verbose_name_plural = 'Достижения'