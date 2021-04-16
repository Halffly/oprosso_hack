import requests
from django.core.handlers.wsgi import WSGIRequest

from api.models import Prototype
from api.models import Step


class Appetize:
	token = "tok_43pe0nhffjy0vm8nbwnh849pd0"
	mainURl = f"https:{token}@api.appetize.io/v1/"
	apps = mainURl + "apps"

	def __init__(self, url):
		self.url = url

	def post(self, data, url):
		headers = {
			'Content-Type': 'application/json'
		}
		response = requests.post(url=url, headers=headers, data=data)
		return response.json()

	@property
	def checkPlatform(self):
		if self.url.endwith(".apk"):
			return "android"
		else:
			return "ios"

	def createKey(self):
		data = {
			"url": self.url,
			"platform": self.checkPlatform
		}
		return self.post(data=data, url=self.apps)


class Api:
	answer = {
		"message": "Success",
		"status": 200,
		'data': {}
	}

	@staticmethod
	def parsePrototypes(prototypes) -> dict:
		return {"data": [
			{"id": prototype.id, "title": prototype.title, "views": prototype.views, "ratings": prototype.ratings,
			 'img': prototype.img.url if prototype.img else None, "isShow": prototype.isShow,
			 "publicKey": prototype.publicKey} for prototype in prototypes]}

	@staticmethod
	def ErrorLink(data) -> dict:
		return {
			"status": 400,
			"data": data,
			"message": "The link to the mobile app was not specified correctly"
		}

	@classmethod
	def getPrototype(cls, **kwargs):
		if kwargs.get("isShow"):
			prototypes = Prototype.objects.filter(isShow=True).order_by("?")
		else:
			prototypes = Prototype.objects.order_by('?')
		cls.answer.update(cls.parsePrototypes(prototypes))
		return cls.answer

	@staticmethod
	def parsePrototype(prototype):
		return {"data": {"id": prototype.id, "title": prototype.title, "views": prototype.views,
		                 "ratings": prototype.ratings,
		                 'img': prototype.img.url if prototype.img else None, "isShow": prototype.isShow,
		                 "publicKey": prototype.publicKey}}


	@classmethod
	def createPrototype(cls, POST: WSGIRequest.POST, FILES):
		data = {
			"title": POST.get("title"),
			"isShow": POST.get("isShow", False),
			"img": FILES.get("img")
		}
		createKey = Appetize(POST.get("app")).createKey()
		print(createKey)
		if createKey.get("publicKey") is None:
			cls.answer.update(cls.ErrorLink(createKey))
			return cls.answer
		prototype = Prototype(**data, publicKey=createKey.get("publicKey")).save()
		for i in dict(POST).get("steps"):
			data = {
				"title": i.get("stepTitle"),
				"text": i.get("stepText"),
				"question": i.get("question"),
				"prototype": prototype
			}
			Step(**data).save()
		cls.answer.update({
			"message": "Success Create"
		})
		return cls.answer
