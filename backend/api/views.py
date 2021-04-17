from django.http import JsonResponse, Http404
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from api.module import Api

@csrf_exempt
def prototype(request):
	if request.method == 'GET':
		if request.GET.get("filter"):
			api = Api.getPrototype(isShow=True)
		else:
			api = Api.getPrototype()
		return JsonResponse(api, status=api['status'])
	elif request.method == 'POST':
		api = Api.createPrototype(request.POST, request.FILES, request.body)
		return JsonResponse(api, status=api['status'])
	else:
		raise Http404

