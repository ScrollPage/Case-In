from django.db import models

from worker.models import Worker 

class Note(models.Model):
    '''Уведомление'''
    user = models.ForeignKey(
        Worker, verbose_name='Работник', 
        on_delete=models.CASCADE, related_name='notifications'
    )
    content = models.CharField(max_length=300)
    seen = models.BooleanField(default=False)
    tmiestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Уведомление'
        verbose_name_plural = 'Уведомления'

