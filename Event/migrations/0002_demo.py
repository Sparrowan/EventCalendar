# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-15 18:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='demo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descrip', models.CharField(max_length=1000)),
            ],
        ),
    ]
