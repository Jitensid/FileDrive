from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, FileUploadSerializer


class RegisterUserView(APIView):
    serializer_class = UserSerializerWithToken
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response({"hello": "everyone"})

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
        return JsonResponse({"Message": "Django + React is Awesome !!!!"})

# X-CSRFToken in header to enable CSRF Token Validation


class FileUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @method_decorator(ensure_csrf_cookie, csrf_protect)
    def post(self, request):
        data = request.data
        data["owner"] = request.user.id
        file_serializer = FileUploadSerializer(data=data)
        if file_serializer.is_valid():
            file_serializer.save()
            return JsonResponse({"Message": "File is Uploaded Successfully!!!"})

        message = file_serializer.errors
        return JsonResponse({"Message": message})
