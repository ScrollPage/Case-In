from django.contrib import admin

from .models import Worker, WorkerInfo, TGBotCode

admin.site.register(Worker)
admin.site.register(WorkerInfo)
admin.site.register(TGBotCode)