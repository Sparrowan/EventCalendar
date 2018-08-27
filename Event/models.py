from django.db import models


class Event(models.Model):
    description=models.CharField(max_length=1000)
    date=models.DateField()
    time=models.TimeField()
    preference=models.CharField(max_length=10)

    class Meta:
        unique_together = ('date', 'time',)


    def __str__(self):
        return self.description

class Demo(models.Model):
    descript=models.CharField(max_length=1000)

    def __str__(self):
        return self.descript