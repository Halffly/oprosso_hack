from django.urls import path

from api.views import prototype, detailsPrototype

urlpatterns = [
	path("prototype/", prototype),
	path("prototype/<int: id>/", detailsPrototype)
]