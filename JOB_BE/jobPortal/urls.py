import debug_toolbar
from django.contrib import admin
from django.urls import path, include, re_path
from jobPortal import settings
from jobs.admin import my_admin_site
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from drf_yasg import openapi

# from jobs.views import MyTokenView

# Phần tích hợp Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="DTT API",
        default_version='v1',
        description="APIs for DTTApp",
        contact=openapi.Contact(email="DTT@gmail.com"),
        license=openapi.License(name="Trần Nguyễn Lê DTT"),
    ),
    public=True,
    # Cấu hình quyền được xem, AllowAny là tất cả mọi người đều được xem
    permission_classes=(permissions.AllowAny,),

)


urlpatterns = [
    path('', include('jobs.urls')),
    # path('admin/', admin.site.urls),
    # Phần custom lại
    path('myadmin/', my_admin_site.urls),
    # Phần Debug Toolbar
    path('__debug__/', include(debug_toolbar.urls)),
    # Phần của CKEditor

]

