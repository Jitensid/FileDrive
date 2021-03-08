from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from api import views as api_views

# 1st url is same as Login URL

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_valid'),
    path('register/', api_views.RegisterUserView.as_view(), name='register'),
    path('test/', api_views.TestView.as_view(), name='test'),
    path('fileupload/', api_views.FileUploadView.as_view(), name='fileupload'),
    path('fetchfiles/', api_views.FetchFilesView.as_view(), name='fetchfiles'),
    path('fetchstarredfiles/', api_views.FetchStarredFilesView.as_view(), name='fetchfiles'),
    path('deletefile/',api_views.DeleteFileView.as_view(), name = 'deletefile'),
    path('changefilestarstatus/',api_views.ChangeFileStarStatus.as_view(),name='changefilestarstatus')
]
