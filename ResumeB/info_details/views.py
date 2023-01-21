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
from .models import About,Project,Skill,Work,Education,Company
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
        serializer=AboutSerializer(project,data=data)
    except:
        serializer=AboutSerializer(data=request.data)
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
        serializer=AboutSerializer(skill,data=data)
    except:
        serializer=AboutSerializer(data=request.data)
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
        serializer=AboutSerializer(work,data=data)
    except:
        serializer=AboutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class EducationView(ListCreateAPIView):
    serializer_class=EducationSerializer
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
        serializer=AboutSerializer(education,data=data)
    except:
        serializer=AboutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
class CompanyView(ListCreateAPIView):
    serializer_class=CompanySerializer
    queryset= Company.objects.all()
    def perform_create(self,serializer):
        pk=self.kwargs.get("pk")
        user= User.objects.get(id=pk)
        serializer.save(user=user)
    def get_queryset(self):
        pk=self.kwargs.get("pk")
        user= User.objects.get(id=pk)
        return self.queryset.filter(user=user)

    @api_view(['GET'])
    def showcompany(request,pos,sk):
        userpos= Work.objects.get(position=pos)
        usersk= Skill.objects.get(skills=sk)
        companies= Company.objects.filter(position=userpos, skills=usersk)
        if companies:
            for company in companies:
                print(company.company_name)
                profile=User.objects.get(id=pk)
                email_body = 'Greetings!'+company.company_name + \
                '\njob opportunities offered by you for'+company.positon+' position and having'+company.skills+ ' skills matches to my resume. So, I can be a perfect employee for this job and this will be my dream job '+'\nMy Contact Details :'+\
                '\nName:'+profile.full_name+'\nPhone Number:'+profile.mobile_number+'\nEmail:'+profile.email
                data = {'email_body': email_body, 'to_email': company.email}

                Util.send_email(data)
        else:
            return Response({"Error":"No Ride is available for this route"},status=status.HTTP_400_BAD_REQUEST)



       