from django.db import models


# Create your models here.

class Prototype(models.Model):
	title = models.CharField(max_length=300)
	views = models.IntegerField(default=0)
	ratings = models.IntegerField(default=0)
	img = models.ImageField("prototype/")
	isShow = models.BooleanField(default=False)
	publicKey = models.TextField()  # Берем отсюда https://docs.appetize.io/api/create-new-app

	def __str__(self):
		return self.title


class Step(models.Model):
	title = models.CharField(max_length=300)
	text = models.TextField()
	question = models.TextField()
	prototype = models.ForeignKey(Prototype, on_delete=models.CASCADE)

	def __str__(self):
		return self.title


class Taps(models.Model):
	type = models.CharField(max_length=300)
	path = models.TextField(null=True, blank=True)
	classElement = models.TextField(null=True, blank=True)
	text = models.TextField(null=True, blank=True)
	resource_id = models.TextField(null=True, blank=True)
	content_desc = models.TextField(null=True, blank=True)
	windowType = models.TextField(null=True, blank=True)
	label = models.TextField(null=True, blank=True)
	accessibilityId = models.TextField(null=True, blank=True)
	parentClass = models.TextField(null=True, blank=True)
	time = models.CharField(max_length=500)
	ui = models.TextField()
	xPos = models.FloatField()
	yPos = models.FloatField()

	def __str__(self):
		return self.type


class UserAnalytics(models.Model):
	taps = models.ForeignKey(Taps, on_delete=models.CASCADE)
	rate = models.IntegerField()
	feedBack = models.TextField(null=True)
	finalComment = models.TextField(null=True)
	isFinished = models.BooleanField(default=False)
	step = models.ForeignKey(Step, on_delete=models.CASCADE)
	averageRate = models.IntegerField()

	def __str__(self):
		return f'Аналитика сцераний: {self.step.title} {self.step.id}'
