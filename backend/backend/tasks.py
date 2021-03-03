
from backend.celery import app as celery_app

from control.models import Test
from worker.models import Worker
from notifications.models import Note

@celery_app.task
def reset_test_send_notificatons():
    Test.objects.filter(category=1).update(is_passed=False, value=0)
    for worker in Worker.objects.all():
        Note.objects.create(user=worker, content='Не забудте пройти ежедневнй тест!')
