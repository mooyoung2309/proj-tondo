from django.db import models


class data(models.Model):
    channel_id = models.CharField(max_length=200)
    bad_comments = models.JSONField(default=dict)
    info = models.JSONField(default=dict)

    def __str__(self):
        """A string representation of the model."""
        return self.channel_id

