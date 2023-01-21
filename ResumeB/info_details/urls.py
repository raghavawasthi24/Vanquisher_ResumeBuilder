from django.urls import path,include
from  info_details.views import *

urlpatterns = [
    path('about/<str:pk>',AboutView.as_view(),name='about_info'),
    path('project/<str:pk>',ProjectView.as_view(),name='education_info'),
    path('skill/<str:pk>',SkillView.as_view(),name='education_info'),
    path('work/<str:pk>',WorkView.as_view(),name='education_info'),
    path('education/<str:pk>',EducationView.as_view(),name='education_info'),
    path('about_put/<str:pk>',about_view,name='about_info_put'),
    path('project_put/<str:pk>',project_view,name='project_info_put'),
    path('skill_put/<str:pk>',skill_view,name='skill_info_put'),
    path('work_put/<str:pk>',work_view,name='work_info_put'),
    path('education_put/<str:pk>',education_view,name='education_info_put'),
  
]