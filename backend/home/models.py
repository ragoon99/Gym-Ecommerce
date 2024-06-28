from django.db import models


class Feedback(models.Model):
    feedback_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    message = models.TextField(max_length=500, blank=False, null=False)