# Generated by Django 4.0.4 on 2022-11-18 08:32

import DjangoUeditor.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_post_content'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='Content',
        ),
        migrations.AlterField(
            model_name='post',
            name='body',
            field=DjangoUeditor.models.UEditorField(blank=True, null=True, verbose_name='内容'),
        ),
    ]