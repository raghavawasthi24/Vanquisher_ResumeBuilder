# Generated by Django 4.1.3 on 2023-01-20 22:46

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info_details', '0005_alter_project_description_alter_project_project_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), size=None)),
                ('skills', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=20), size=None)),
            ],
        ),
    ]
