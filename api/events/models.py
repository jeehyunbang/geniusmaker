from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    category = models.CharField(max_length=20)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
