from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import File


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username')

# For signUps


class UserSerializerWithToken(serializers.ModelSerializer):
    refresh_token = serializers.SerializerMethodField()
    access_token = serializers.SerializerMethodField()
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password', 'placeholder': 'Password'})
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def get_refresh_token(self, obj):
        refresh = RefreshToken.for_user(
            User.objects.get(username=obj.username))
        return str(refresh)

    def get_access_token(self, obj):
        refresh = RefreshToken.for_user(
            User.objects.get(username=obj.username))
        return str(refresh.access_token)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['refresh_token', 'access_token', 'username',
                  'email', 'first_name', 'last_name', 'password']


class FileUploadSerializer(serializers.ModelSerializer):
    # owner = serializers.PrimaryKeyRelatedField(read_only=True)
    file = serializers.FileField()

    def create(self, validated_data):
        owner = validated_data.pop("owner")
        file_object = File.objects.create(
            owner=owner, **validated_data)
        return file_object

    class Meta:
        model = File
        fields = '__all__'
