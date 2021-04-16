from django.urls import path

from api.views import prototype

urlpatterns = [
	path("prototype/", prototype)
]