from django.db import models
from account.models import User
from django.contrib.postgres.fields import ArrayField

class About(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    full_name=models.CharField(max_length=200,null=False)
    role=models.CharField(max_length=50,null=False)
    email=models.EmailField(unique=True)
    mobile_number=models.CharField(max_length=10,unique=True)
    address=models.TextField(null=False)
    linkedin=models.CharField(max_length=15,null=True)

class Project(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    project_name = ArrayField(models.CharField(max_length=100), blank=True)
    project_url = ArrayField(models.URLField(max_length=200), blank=True)
    description = ArrayField(models.TextField(max_length=500), blank=True)
class Education(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    degree = ArrayField(models.CharField(max_length=20), blank=True)
    school = ArrayField(models.CharField(max_length=200), blank=True)
    start_year= ArrayField(models.URLField(max_length=4), blank=True)
    end_year= ArrayField(models.URLField(max_length=4), blank=True)
    grade= ArrayField(models.URLField(max_length=2), blank=True)
class Skill(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    skills = ArrayField(models.CharField(max_length=20), blank=True)
class Work(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    position = ArrayField(models.CharField(max_length=200), blank=True)
    company = ArrayField(models.URLField(max_length=100), blank=True)
    employment_type= ArrayField(models.TextField(max_length=50), blank=True)
    start_date=ArrayField(models.DateField(blank=True))
    end_date=ArrayField(models.DateField(blank=True))
    description = ArrayField(models.TextField(max_length=500), blank=True)
class Company_User(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    company_name=models.CharField(max_length=100)
    employment_type= models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    email=models.EmailField(unique=False)


