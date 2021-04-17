from django.urls import path

from api.views import prototype, detailsPrototype, saveFile

urlpatterns = [
	path("prototype/", prototype),
	path("prototype/<int:id>/", detailsPrototype),
	path("file-save/", saveFile)
]