from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone

from worker.models import Worker


class DiagramTask(models.Model):
    """Задания на диаграмме Ганта"""

    user = models.ForeignKey(
        Worker,
        verbose_name="Исполняющий",
        on_delete=models.CASCADE,
        related_name="diagram_tasks",
    )
    begin_time = models.DateField()
    end_time = models.DateField()
    name = models.CharField("Название задачи", max_length=50)
    description = models.CharField("Описание задачи", max_length=200, default="")
    percentage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"


@receiver(pre_save, sender=DiagramTask)
def first_task(sender, instance=None, created=False, **kwargs):
    """Ачивка номер 4"""
    achieve = instance.user.achievements.get(name=4)
    if not achieve.done:
        if (
            not instance.user.diagram_tasks.filter(percentage=100).exists()
            and instance.percentage == 100
        ):
            achieve.set_done()


@receiver(post_save, sender=DiagramTask)
def ten_tasks(sender, instance=None, created=False, **kwargs):
    """Ачивка номер 5"""
    achieve = instance.user.achievements.get(name=5)
    if not achieve.done:
        if (
            instance.user.diagram_tasks.filter(percentage=100).count() == 10
            and instance.percentage == 100
        ):
            achieve.set_done()


@receiver(post_save, sender=DiagramTask)
def last_day(sender, instance=None, created=False, **kwargs):
    """Ачивка номер 7"""
    achieve = instance.user.achievements.get(name=7)
    if not achieve.done:
        if instance.percentage == 100 and timezone.now().date() == instance.end_time:
            achieve.set_done()
