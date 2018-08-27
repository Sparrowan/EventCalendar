from django.contrib import admin

#Register your models here.
from  .models import  Event,Demo
admin.site.register(Event)
admin.site.register(Demo)
