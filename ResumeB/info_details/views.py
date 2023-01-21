from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import permissions
from rest_framework.permissions  import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi 
from rest_framework.generics import ListCreateAPIView
from .serializers import AboutSerializer,ProjectSerializer,SkillSerializer,WorkSerializer,EducationSerializer,CompanySerializer
from .models import About,Project,Skill,Work,Education,Company_User
from django.conf import settings
from django.utils.translation import gettext_lazy 
import json 
from account.models import User
from .permissions import IsOwner
from .utils import Util


class AboutView(ListCreateAPIView):
    serializer_class=AboutSerializer
    queryset=About.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        serializer.save(user=user,full_name=user.full_name,email=user.email)
    def get_queryset(self):
        pk=self.kwargs.get('pk')
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def about_view(request,pk):
    about=About.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=AboutSerializer(about,data=data)
    except:
        serializer=AboutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class ProjectView(ListCreateAPIView):
    serializer_class=ProjectSerializer
    queryset=Project.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def project_view(request,pk):
    project=Project.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=ProjectSerializer(project,data=data)
    except:
        serializer=ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class SkillView(ListCreateAPIView):
    serializer_class=SkillSerializer
    queryset=Skill.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def skill_view(request,pk):
    skill=Skill.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=SkillSerializer(skill,data=data)
    except:
        serializer=SkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class WorkView(ListCreateAPIView):
    serializer_class=WorkSerializer
    queryset=Work.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def work_view(request,pk):
    work=Work.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=WorkSerializer(work,data=data)
    except:
        serializer=WorkSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class EducationView(ListCreateAPIView):
    serializer_class=ProjectSerializer
    queryset=Education.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def education_view(request,pk):
    education=Education.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=EducationSerializer(education,data=data)
    except:
        serializer=EducationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class CompanyView(ListCreateAPIView):
    serializer_class=CompanySerializer
    queryset=Company_User.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        employment=self.kwargs.get("employment")
        user=User.objects.get(id=pk)
        user_email=About.objects.filter(role=employment)
        email_of_all=[]
        users_all=[]
        for users in user_email:
            users_all.append(users)
            email_of_all.append(users.email)
        for user_email in users_all:
            email_body = 'Hi '+user.full_name + \
            '\nThis candidate is elligible for the job offred by you.\nDetails of User:\n'+\
                'Name:'+user_email.full_name+'\nPhone_number:'+user_email.mobile_number+'\nEmail:\n'+user_email.email
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Ride has been booked'}

            Util.send_email(data)
        print(email_of_all)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user=User.objects.get(id=pk)
        return self.queryset.filter(user=user)
@api_view(['PUT'])
def company_view(request,pk):
    company=Company_User.objects.get(id=pk)
    try:
        data=JSONParser().parse(request)
        serializer=CompanySerializer(company,data=data)
    except:
        serializer=CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

