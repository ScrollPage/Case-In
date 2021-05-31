from rest_framework.exceptions import ParseError
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.db import models

from worker.models import Worker
from department.models import Department


class CalendlyTask(models.Model):
    """Задача в календаре"""

    depart = models.ForeignKey(
        Department,
        verbose_name="Отдел",
        related_name="calendly_tasks",
        on_delete=models.CASCADE,
    )
    datetime = models.DateTimeField("Назначенное время")
    description = models.CharField(max_length=500)

    class Meta:
        verbose_name = "Задача в календаре"
        verbose_name_plural = "Задачи в календаре"


class Confirmation(models.Model):
    """Подтверждение похода на мероприятие"""

    user = models.ForeignKey(
        Worker,
        verbose_name="Работник",
        related_name="calendly_confirmations",
        on_delete=models.CASCADE,
    )
    task = models.ForeignKey(
        CalendlyTask,
        verbose_name="Мероприятие",
        related_name="confirmations",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Подтверждение"
        verbose_name_plural = "Подтверждения"
        unique_together = ("user", "task")


@receiver(post_save, sender=Confirmation)
def five_confirmations(sender, instance=None, created=False, **kwargs):
    """Ачивка номер 6"""
    achieve = instance.user.achievements.get(name=6)
    if not achieve.done:
        if instance.user.calendly_confirmations.count() == 5:
            achieve.set_done()
