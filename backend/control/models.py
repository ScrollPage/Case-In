from django.db import models

from worker.models import Worker

class Test(models.Model):
    '''Ежедневный тест'''
    CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
    )

    user = models.ForeignKey(
        Worker, verbose_name='Тестируемый', 
        related_name='tests', on_delete=models.CASCADE
    )
    category = models.CharField(max_length=1, choices=CHOICES, default='')
    value = models.SmallIntegerField(default=0)
    is_passed = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'