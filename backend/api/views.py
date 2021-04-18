from django.http import JsonResponse, Http404
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from api.module import Api

@csrf_exempt
def prototype(request):
	if request.method == 'GET':
		if request.GET.get("filter"):
			api = Api.getPrototypes(isShow=True)
		else:
			api = Api.getPrototypes()
		return JsonResponse(api, status=api['status'])
	elif request.method == 'POST':
		api = Api.createPrototype(request.FILES, request.body)
		return JsonResponse(api, status=api['status'])
	else:
		raise Http404

def detailsPrototype(request, id):
	api = Api().getPrototype(id)
	return JsonResponse(api, status=api['status'])

@csrf_exempt
def saveFile(request):
	if request.method == 'POST':
		api = Api.SaveFile(request.FILES)
		return JsonResponse(api, status=api['status'])
	print(request.body)
	api = Api.SaveFile(request.FILES)
	return JsonResponse(api, status=api['status'])

def getApplications(request):
	url = request.get_raw_uri()
	url = url.replace(":{0}{1}".format(request.get_port(), request.path), "")
	api = Api.getApps(url)
	return JsonResponse(api, status=api['status'])

def getApplication(request, id):
	url = request.get_raw_uri()
	url = url.replace(":{0}{1}".format(request.get_port(), request.path), "")
	api = Api.getApp(url, id)
	return JsonResponse(api, status=api['status'])

@csrf_exempt
def clearApplication(request):
	print(request.method)
	if request.method == 'POST':
		api = Api().clear()
		return JsonResponse(api, status=api['status'])

def analytics(request, id):
	api = Api.getAnalytics(id)
	return JsonResponse(api, status=api['status'])


def analytics_screen(request, id):
	api = Api.analytics(id, title="Посещенных экраннов", value=1)
	return JsonResponse(api, status=api['status'])

def analytics_count_taps(request, id):
	api = Api.analytics(id, title="Количество тапов", value=1)
	return JsonResponse(api, status=api['status'])

