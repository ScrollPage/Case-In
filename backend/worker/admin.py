from django.contrib import admin

from .models import Worker, WorkerInfo

admin.site.register(Worker)
admin.site.register(WorkerInfo)