
from django.contrib import admin
from django.urls import path,include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from account import views as user_views


schema_view = get_schema_view(
   openapi.Info(
      title="AUTH API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.Vanquisher.com/policies/terms/",
      contact=openapi.Contact(email="contact@Vanquisher.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
       path('admin/', admin.site.urls),
    path('accounts/',include('account.urls')),
    path('info_details/',include('info_details.urls')),
    
   path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] 
