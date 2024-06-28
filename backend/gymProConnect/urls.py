from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    
    path('accounts/', include('accounts.urls')),
    
    path('', include('home.urls')),
    path('', include('equipment.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)