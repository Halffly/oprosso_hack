import json

import requests
from django.core.handlers.wsgi import WSGIRequest

from api.models import Prototype, QuestionStep
from api.models import Step


class Appetize:
	token = "tok_43pe0nhffjy0vm8nbwnh849pd0"
	mainURl = f"https://{token}@api.appetize.io/v1/"
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
	def getPlatform(self):
		if self.url.endswith(".apk"):
			return "android"
		else:
			return "ios"

	def createKey(self):
		data = {
			"url": self.url,
			"platform": self.getPlatform
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
			{
				"id": prototype.id,
				"title": prototype.title,
				"views": prototype.views,
				"ratings": prototype.ratings,
				'img': prototype.img.url if prototype.img else None,
				"isShow": prototype.isShow,
				"publicKey": prototype.publicKey
			} for prototype in prototypes]}

	@staticmethod
	def ErrorLink(data) -> dict:
		return {
			"status": 400,
			"data": data,
			"message": "The link to the mobile app was not specified correctly"
		}

	def ErrorNotExistPrototype(self, id):
		return {
			"status": 404,
			"data": {},
			"message": f"The prototype for this id({id}) does not exist"
		}

	@classmethod
	def getPrototypes(cls, **kwargs):
		if kwargs.get("isShow"):
			prototypes = Prototype.objects.filter(isShow=True).order_by("?")
		else:
			prototypes = Prototype.objects.order_by('?')
		cls.answer.update(cls.parsePrototypes(prototypes))
		return cls.answer

	def getPrototype(self, id):
		prototype = Prototype.objects.filter(id=id).first()
		if prototype is None:
			self.answer.update(self.ErrorNotExistPrototype(id))
			return self.answer
		self.answer.update(self.__parsePrototype(prototype))
		return self.answer

	@staticmethod
	def parseSteps(prototype):
		steps = Step.objects.filter(prototype=prototype)
		return [
			{
				"id": step.id,
				"title": step.title,
				"text": step.text,
				"question": list(step.question)
			}
			for step in steps]

	def __parsePrototype(self, prototype):
		return {"data":
			{
				"id": prototype.id,
				"title": prototype.title,
				"views": prototype.views,
				"ratings": prototype.ratings,
				'img': prototype.img.url if prototype.img else None,
				"isShow": prototype.isShow,
				"publicKey": prototype.publicKey,
				'step': self.parseSteps(prototype)
			}
		}

	@classmethod
	def createPrototype(cls, FILES, body):
		print(FILES, body)
		POST = json.loads(body)
		data = {
			"title": POST.get("title"),
			"isShow": POST.get("isShow", False),
			"img": FILES.get("img") if FILES.get("img") is not None else POST.get("img")
		}
		createKey = Appetize(POST.get("app")).createKey()
		print(createKey)
		if createKey.get("publicKey") is None:
			cls.answer.update(cls.ErrorLink(createKey))
			return cls.answer
		prototype = Prototype(**data, publicKey=createKey.get("publicKey"))
		prototype.save()
		step = POST.get("step", [])
		for i in step:
			data = {
				"title": i.get("stepTitle"),
				"text": i.get("stepText"),
				"prototype": prototype,
			}
			questions = []
			for question in i.get("questions"):
				ques = QuestionStep(title=question)
				ques.save()
				questions.append(ques)
			data.update({"question": questions})
			Step(**data).save()
		cls.answer.update({
			"message": "Success Create"
		})
		return cls.answer
