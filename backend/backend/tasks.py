
from backend.celery import app as celery_app

from control.models import Test

@celery_app.task
def update():
    Test.objects.filter(category=1).update(is_passed=False, value=0)