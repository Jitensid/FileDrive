from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, FileUploadSerializer, FetchFileSerializer
import time
from .models import File, directory_name

# API to create a new user
class RegisterUserView(APIView):
	serializer_class = UserSerializerWithToken
	permission_classes = (permissions.AllowAny,)

	# Get Request Message
	def get(self, request):
		return Response({"hello": "everyone"})

	# Post Request creates new user
	def post(self, request, format=None):
		serializer = UserSerializerWithToken(data=request.data)
		print(request.data)
		if serializer.is_valid():
			serializer.save()
			content = {"Message": "Account Created !!!"}
			return Response(content, status=status.HTTP_200_OK)

		return Response(serializer.errors)


class TestView(APIView):

	permission_classes = [permissions.IsAuthenticated]

	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):
		print(request.user.username)
		time.sleep(1)
		return JsonResponse({"Message": "Django + React is Awesome !!!!"})

# X-CSRFToken in header to enable CSRF Token Validation

# API to upload file


class FileUploadView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	# Ensures CSRF Token Validation
	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):

		# Get data and add it into FileUploadSerializer
		data = request.data
		data["owner"] = request.user.id
		file_serializer = FileUploadSerializer(data=data)

		# If valid then save and return response
		if file_serializer.is_valid():
			file_serializer.save()
			return Response(file_serializer.data)

		# Else return error message
		message = file_serializer.errors
		return JsonResponse({"Message": message})

# API to fetch files


class FetchFilesView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	# Ensures CSRF Token Validation
	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):

		# Get all files of the owner
		file_queryset = File.objects.filter(
			owner=request.user).order_by('created').reverse()

		# Create serializer for the files
		serialized_data = FetchFileSerializer(file_queryset, many=True)

		# Send Response
		return Response(serialized_data.data)

# API to fetch starred files


class FetchStarredFilesView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	# Ensures CSRF Token Validation
	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):

		# Get all starred files of the owner
		file_queryset = File.objects.filter(
			owner=request.user, is_starred=True).order_by('created').reverse()

		# Create serializer for the files
		serialized_data = FetchFileSerializer(file_queryset, many=True)

		# Send Response
		return Response(serialized_data.data)

# API to delete file


class DeleteFileView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	# Ensures CSRF Token Validation
	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):
		# Get Filename from request
		filename = request.data["filename"]

		# Getting complete path of the file stored
		actual_file = directory_name + request.user.username + "/" + filename

		file_to_delete = File.objects.get(owner=request.user, file=actual_file)

		# Deleting the desired file
		file_to_delete.delete()

		# Return Response
		return JsonResponse({"Message": "File Deleted Successfully"})

# API to change file star status


class ChangeFileStarStatus(APIView):
	permission_classes = [permissions.IsAuthenticated]

	# Ensures CSRF Token Validation
	@method_decorator(ensure_csrf_cookie, csrf_protect)
	def post(self, request):

		# Get Filename from request
		filename = request.data["filename"]

		# Getting complete path of the file
		actual_filename = directory_name + request.user.username + "/" + filename

		actual_file = File.objects.get(
			owner=request.user, file=actual_filename)

		# Calling method to change file star status
		actual_file.changefilestartstatus()

		# Return Response
		return JsonResponse({"Message": "Operation Successful"})
