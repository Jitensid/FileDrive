import datetime
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import File


# User Serializer
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username')

# Serializer for Register User
class UserSerializerWithToken(serializers.ModelSerializer):
    # get refresh and access token with methods
    refresh_token = serializers.SerializerMethodField()
    access_token = serializers.SerializerMethodField()
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password', 'placeholder': 'Password'})
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    # returns refresh_token for the user
    def get_refresh_token(self, obj):
        refresh = RefreshToken.for_user(
            User.objects.get(username=obj.username))
        return str(refresh)

    # returns access_token for the user
    def get_access_token(self, obj):
        refresh = RefreshToken.for_user(
            User.objects.get(username=obj.username))
        return str(refresh.access_token)

    def create(self, validated_data):
        # get password from the validated_data
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        # Save the object
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['refresh_token', 'access_token', 'username',
                  'email', 'first_name', 'last_name', 'password']


# Serializer for uploading files
class FileUploadSerializer(serializers.ModelSerializer):
    # owner = serializers.PrimaryKeyRelatedField(read_only=True)
    file = serializers.FileField()
    size = serializers.SerializerMethodField()
    filename = serializers.SerializerMethodField()

    # get the original representation
    def to_representation(self, obj):
        desired_serializer = super(
            FileUploadSerializer, self).to_representation(obj)

        serialized_date = datetime.datetime.fromisoformat(
            desired_serializer["created"])

        # print(serialized_date.date().strftime("%b %d %Y"))
        desired_serializer["created"] = serialized_date.date().strftime(
            "%b %d %Y")

        desired_serializer.pop("owner")
        return desired_serializer

    def create(self, validated_data):
        # fetch owner and then create the file object
        owner = validated_data.pop("owner")
        file_object = File.objects.create(
            owner=owner, **validated_data)
        return file_object

    # Method to find size of the file
    def get_size(self, obj):
        return obj.file.size

    # Method that returns filename
    def get_filename(self, obj):
        return obj.filename()

    class Meta:
        model = File
        fields = ('file', 'created', 'size', 'owner', 'filename')


# Serializer for fetching files
class FetchFileSerializer(serializers.ModelSerializer):
    file = serializers.FileField()
    size = serializers.SerializerMethodField()
    filename = serializers.SerializerMethodField()

    # get the original representation
    def to_representation(self, obj):
        desired_serializer = super(
            FetchFileSerializer, self).to_representation(obj)

        serialized_date = datetime.datetime.fromisoformat(
            desired_serializer["created"])

        # print(serialized_date.date().strftime("%b %d %Y"))
        desired_serializer["created"] = serialized_date.date().strftime(
            "%b %d %Y")
        return desired_serializer

    # Method that returns size of the file
    def get_size(self, obj):
        return obj.file.size

    # Method that returns filename
    def get_filename(self, obj):
        return obj.filename()

    class Meta:
        model = File
        fields = ('file', 'created', 'size', 'filename', 'is_starred')
