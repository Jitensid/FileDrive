import os
import datetime
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_delete
from Drive.storage_backends import PrivateMediaStorage

# Create your models here.

directory_name = "Storage/"

# Function to get the folder where files of a user will be stored
def get_user_directory(instance, filename):
    return directory_name + '{0}/{1}'.format(instance.owner.username, filename)


# File Model
class File(models.Model):
    # owner attribute is Foreign Key and delete it once owner is deleted
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    # file attribute which represents the file user wants to store
    # Files are uploaded in the desired directory and it is acessible via signed URL due to PrivateMediaStorage class
    file = models.FileField(
        upload_to=get_user_directory, storage=PrivateMediaStorage())

    # Date attribute which represents when file was uploaded
    created = models.DateTimeField(default=datetime.datetime.today)

    # is_starred attribute indicates whether file is starred or not
    # True -> Starred
    # False -> Not Starred
    is_starred = models.BooleanField(default=False)

    # Method returns filename
    def filename(self):
        return os.path.basename(self.file.name)

    def __str__(self):
        return self.filename()

    # Overriding Save Method 
    def save(self, *args, **kwargs):

        # If Update Operation then get all files which has same filename as the one which is being uploaded.
        # Delete all such files
        if self._state.adding is True:
            existing_file_name = directory_name + self.owner.username + "/" + self.filename()

            existing_files = File.objects.filter(file=existing_file_name)

            if existing_files:
                for existing_file in existing_files:
                    existing_file.delete()

        super(File, self).save(*args, **kwargs)

    # Method which changes filestarstatus
    def changefilestartstatus(self):
        self.is_starred = not(self.is_starred)
        self.save()

# Signal to delete the actual file once its object is deleted

@receiver(post_delete, sender=File)
def submission_delete(sender, instance, **kwargs):
    instance.file.delete(False)
