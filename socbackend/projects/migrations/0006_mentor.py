# Generated by Django 4.2.6 on 2024-12-30 11:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mentor_accounts', '0001_initial'),
        ('projects', '0005_alter_project_banner_image_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mentor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('season', models.TextField(default='')),
                ('user', models.OneToOneField(help_text='The user corresponding to the mentee.', on_delete=django.db.models.deletion.CASCADE, to='mentor_accounts.userprofile2')),
            ],
        ),
    ]
