from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os


class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name, max_length=None):

        self.delete(name)

        # print("Value of name", name)
        return name
