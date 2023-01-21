from rest_framework import serializers

from .models import About,Project,Education,Skill,Work,Company_User
from account.models import User

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model=About
        fields="__all__"
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields="__all__"
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Education
        fields="__all__"
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skill
        fields="__all__"
class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Work
        fields="__all__"
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company_User
        fields="__all__"
