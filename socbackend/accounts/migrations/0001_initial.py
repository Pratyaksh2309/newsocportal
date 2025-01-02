# Generated by Django 4.2.6 on 2025-01-02 11:01

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(max_length=150, unique=True)),
                ('role', models.CharField(choices=[('mentee', 'Mentee'), ('mentor', 'Mentor')], max_length=10)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(blank=True, default='', max_length=100)),
                ('profile_picture', models.ImageField(blank=True, default='', upload_to=accounts.models.upload_to_location)),
                ('phone_number', models.CharField(max_length=15)),
                ('roll_number', models.CharField(error_messages={'unique': 'A user with that roll number already exists.'}, help_text='Required. 9 characters or fewer.', max_length=9, unique=True, validators=[accounts.models.validate_roll_number], verbose_name='roll number')),
                ('year', models.CharField(choices=[('First Year', 'First Year'), ('Second Year', 'Second Year'), ('Third Year', 'Third Year'), ('Fourth Year', 'Fourth Year'), ('Fifth Year', 'Fifth Year'), ('M.Tech', 'M.Tech'), ('Ph.D.', 'Ph.D.')], max_length=100)),
                ('department', models.CharField(choices=[('Aerospace Engineering', 'Aerospace Engineering'), ('Biosciences and Bioengineering', 'Biosciences and Bioengineering'), ('Chemical Engineering', 'Chemical Engineering'), ('Chemistry', 'Chemistry'), ('Civil Engineering', 'Civil Engineering'), ('Computer Science and Engineering', 'Computer Science and Engineering'), ('Earth Sciences', 'Earth Sciences'), ('Economics', 'Economics'), ('Electrical Engineering', 'Electrical Engineering'), ('Energy Science and Engineering', 'Energy Science and Engineering'), ('Engineering Physics', 'Engineering Physics'), ('Environmental Science and Engineering', 'Environmental Science and Engineering'), ('Humanities and Social Sciences', 'Humanities and Social Sciences'), ('Industrial Design Centre', 'Industrial Design Centre'), ('Mathematics', 'Mathematics'), ('Mechanical Engineering', 'Mechanical Engineering'), ('Metallurgical Engineering and Materials Science', 'Metallurgical Engineering and Materials Science'), ('Physics', 'Physics'), ('Other', 'Other')], max_length=50)),
                ('verified', models.BooleanField(default=False)),
                ('verification_token', models.CharField(blank=True, default='', max_length=32)),
            ],
        ),
    ]
