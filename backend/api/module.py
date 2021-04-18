import json

import requests

from api.models import Prototype, File, Analytics
from api.models import Step


class Appetize:
	token = "tok_43pe0nhffjy0vm8nbwnh849pd0"
	mainURl = f"https://{token}@api.appetize.io/v1/"
	apps = mainURl + "apps"

	def __init__(self, url):
		self.url = url

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
		url = "https://tok_43pe0nhffjy0vm8nbwnh849pd0@api.appetize.io/v1/apps"

		payload = json.dumps({
			"url": "https://trashbox.ru/files20/1425479_d892e0/com.supercell.clashofclans_14.0.4_1346.apk",
			"platform": "android"
		})
		headers = {
			'Content-Type': 'application/json'
		}

		response = requests.request("POST", url, headers=headers, data=payload)

		print(response.text)


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

	def ErrorNotExistPrototype(self, id, service="prototype"):
		return {
			"status": 404,
			"data": {},
			"message": f"The {service} for this id({id}) does not exist"
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
	def SaveFile(cls, files):
		print(files)
		_file = files.get("file")
		print(_file)
		File(file=_file).save()
		return cls.answer

	@classmethod
	def createPrototype(cls, FILES):
		print(FILES)
		cls.answer.update({
			"status": 301,
			"message": "Проблема с api"
		})
		return cls.answer

	# POST = json.loads(body)
	# data = {
	# 	"title": POST.get("title"),
	# 	"isShow": POST.get("isShow", False),
	# 	"img": FILES.get("img") if FILES.get("img") is not None else POST.get("img")
	# }
	# createKey = Appetize(POST.get("app")).createKey()
	# print(createKey)
	# if createKey.get("publicKey") is None:
	# 	cls.answer.update(cls.ErrorLink(createKey))
	# 	return cls.answer
	# prototype = Prototype(**data, publicKey=createKey.get("publicKey"))
	# prototype.save()
	# step = POST.get("step", [])
	# for i in step:
	# 	data = {
	# 		"title": i.get("stepTitle"),
	# 		"text": i.get("stepText"),
	# 		"prototype": prototype,
	# 	}
	# 	questions = []
	# 	for question in i.get("questions"):
	# 		ques = QuestionStep(title=question)
	# 		ques.save()
	# 		questions.append(ques)
	# 	data.update({"question": questions})
	# 	Step(**data).save()
	# cls.answer.update({
	# 	"message": "Success Create"
	# })
	# return cls.answer
	@staticmethod
	def parseApp(app, domain) -> dict:
		name = str(app)
		if name.startswith("application/"):
			name = name[len("application/"):]
		return {
			"id": app.id,
			"file": domain + app.file.url if app.file else domain + "/media/" + str(app.file),
			"date_create": app.date_create,
			"name": name
		}

	def parseApps(self, apps, domain) -> dict:
		return {"data": [self.parseApp(app, domain) for app in apps]}

	@classmethod
	def getApp(cls, request, id):
		app = File.objects.filter(id=id).first()
		if app is None:
			cls.answer.update(cls.ErrorNotExistPrototype(id, "application"))
			return cls.answer
		cls.checkAnswer(cls)
		cls.answer.update({"data": cls.parseApp(app, request)})
		return cls.answer

	def checkAnswer(self):
		if self.answer['status'] != 200:
			self.answer.update({
				"status": 200,
				"message": "Success",
				"data": {}
			})

	@classmethod
	def getApps(cls, request):
		apps = File.objects.all()
		cls.checkAnswer(cls)
		cls.answer.update(cls.parseApps(cls, apps, request))
		return cls.answer

	@classmethod
	def analytics(cls, app_id, **kwargs):
		app = File.objects.filter(id=app_id).first()
		cls.checkAnswer(cls)
		cls.answer.update({"data": {}})
		if app is None:
			app = File.objects.filter(id=8).first()
			analytic = Analytics.objects.filter(title__icontains=kwargs.get("title")).first()
			if analytic is None:
				if app is None:
					return cls.answer
				Analytics(**kwargs, app=app).save()
				return cls.answer
			analytic.value += kwargs.get("value", 1)
			analytic.save()
			return cls.answer
		analytic = Analytics.objects.filter(title__icontains=kwargs.get("title")).first()
		if analytic is None:
			Analytics(**kwargs, app=app).save()
			return cls.answer
		analytic.value += kwargs.get("value", 1)
		analytic.save()
		return cls.answer

	def clear(self):
		apps = File.objects.all()
		for i in apps:
			if not i.file:
				i.delete()
		return self.answer

	@staticmethod
	def analyticsParse(analytics) -> dict:
		return {
			"data": [{
				"id": analytic.id,
				"title": analytic.title,
				"value": analytic.value,
			}
				for analytic in analytics
			]
		}

	@classmethod
	def getAnalytics(cls, id):
		app = File.objects.filter(id=id).first()
		if app is None:
			app = File.objects.filter(id=8).first()
			if app is None:
				return cls.answer
		analytic = Analytics.objects.filter(app=app)
		cls.checkAnswer(cls)
		cls.answer.update(cls.analyticsParse(analytic))
		return cls.answer