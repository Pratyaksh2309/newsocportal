# Generated by Django 4.2.6 on 2024-12-21 14:41

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_userprofile_department'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='roll_number',
            field=models.CharField(error_messages={'unique': 'A user with that roll number already exists.'}, help_text='Required. 9 characters or fewer.', max_length=9, unique=True, validators=[accounts.models.validate_roll_number], verbose_name='roll number'),
        ),
    ]
