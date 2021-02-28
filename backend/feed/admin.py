from django.contrib import admin

from .models import Star, Rating, Like

admin.site.register(Star)
admin.site.register(Rating)
admin.site.register(Like)