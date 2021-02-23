import os
import datetime
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from .storage import OverwriteStorage
from django.dispatch import receiver
from django.db.models.signals import post_delete

# Create your models here.

directory_name = "Storage/"


def get_user_directory(instance, filename):
    return directory_name + '{0}/{1}'.format(instance.owner.username, filename)


class File(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(
        upload_to=get_user_directory, storage=OverwriteStorage())
    created = models.DateTimeField(default=datetime.datetime.today)

    def filename(self):
        return os.path.basename(self.file.name)

    def __str__(self):
        return self.filename()

    def save(self, *args, **kwargs):
        existing_file_name = directory_name + self.owner.username + "/" + self.filename()

        existing_files = File.objects.filter(file=existing_file_name)

        if existing_files:
            for existing_file in existing_files:
                existing_file.delete()

        super(File, self).save(*args, **kwargs)

# Signal to delete the actual file once its object is deleted   


@receiver(post_delete, sender=File)
def submission_delete(sender, instance, **kwargs):
    instance.file.delete(False)

# class Folder(models.Model):
#     owner = models.ForeignKey(User, on_delete=models.CASCADE)
#     files = models.ManyToManyField(File,blank=True)
#     folders = models.ManyToManyField("self",symmetrical =False, blank = True)
#     name = models.CharField(max_length = 1000)
#     created = models.DateTimeField(default = timezone.now)

#     def __str__(self):
#         return self.name + " Folder"
