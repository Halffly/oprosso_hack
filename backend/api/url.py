from django.urls import path

from api.views import prototype, detailsPrototype, saveFile, getApplications, getApplication, clearApplication, \
	analytics_screen, analytics_count_taps, analytics

urlpatterns = [
	path("prototype/", prototype),
	path("prototype/<int:id>/", detailsPrototype),
	path("file-save/", saveFile),
	path("application/", getApplications),
	path("application/<int:id>", getApplication),
	path("application/clear", clearApplication),
	path("results/<int:id>/", analytics),
	path("results/screen/<int:id>/", analytics_screen),
	path("results/count-taps/<int:id>/", analytics_count_taps)
]