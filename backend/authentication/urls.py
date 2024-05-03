from django.urls import path
from .views import LoginApiView, RegisterApiView, LogoutApiView, AuthInfoApiView

urlpatterns = [
    path('user/', AuthInfoApiView.as_view(), name='user'),
    path('login/', LoginApiView.as_view(), name='login'),
    path('signup/', RegisterApiView.as_view(), name='signup'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
]
