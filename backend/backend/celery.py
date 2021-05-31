import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "reset": {
        "task": "control.tasks.reset_test_send_notificatons",
        "schedule": crontab(day_of_week="*", hour=8),
    }
}
