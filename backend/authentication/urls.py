from django.urls import path
from .views import LoginApiView, RegisterApiView, LogoutApiView, AuthInfoApiView, ChangePasswordApiView, DeleteAccountApiView

urlpatterns = [
    path('user/', AuthInfoApiView.as_view(), name='user'),
    path('login/', LoginApiView.as_view(), name='login'),
    path('signup/', RegisterApiView.as_view(), name='signup'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    path('change-password/', ChangePasswordApiView.as_view(), name='change_password'),
    path('delete-account/', DeleteAccountApiView.as_view(), name='delete_account'),

]
