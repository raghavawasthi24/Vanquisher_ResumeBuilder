from rest_framework.response import Response
from rest_framework import status, generics ,permissions
from rest_framework.views import APIView
from account.serializers import( 
RegisterSerializer,
UserProfileSerializer,
LoginSerializer,
LogoutSerializer,
EmailVerificationSerializer,
ResetPasswordEmailRequestSerializer,
SetNewPasswordSerializer)
# ReCaptchaSerializer )
from account.renderers import UserRenderer
from django.contrib.auth import authenticate  
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import IsAuthenticated 
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .models import User
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi 
from django.shortcuts import redirect
from rest_framework.decorators import api_view

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str,force_str,smart_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.utils.translation import gettext_lazy 
from django.contrib.auth import login,logout
from django.contrib import auth 

class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
        token = str(RefreshToken.for_user(user).access_token)
        current_site = get_current_site(request).domain
        relativeLink = reverse('email-verify')
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = 'Hi '+user.full_name + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}
        email_body2 = 'Hi '+ \
            ' Your account has been added as the account of relative for ' + user.full_name +'.'
        data2 = {'email_body': email_body2, 'to_email': user.email_of_relative,
                'email_subject': 'Your are added as relative.'}

        Util.send_email(data)
        Util.send_email(data2)
        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=["HS256"])
            user = User.objects.get(id=payload['user_id'])
            if not user.isverified:
                user.isverified = True
                user.save()
            return redirect("https://team-csi-trainees.github.io/Raghav-Authentication/")
        except jwt.ExpiredSignatureError as identifier:
             return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
             return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
class LoginAPIView(generics.GenericAPIView):
     serializer_class=LoginSerializer
     def post(self,request):
         serializer=self.serializer_class(data=request.data)
         mobile_number=request.data.get('mobile_number','')
         password=request.data.get('password','')
         user=auth.authenticate(mobile_number=mobile_number,password=password)
         login(request, user)
         user=User.objects.get(mobile_number=mobile_number)
         user_profile=UserProfileSerializer(user,many=False)
         serializer.is_valid(raise_exception=True)
         return Response({'login_credentials':serializer.data , 'profile_data':user_profile.data},status=status.HTTP_200_OK)
class LogoutAPIView(generics.GenericAPIView):
    serializer_class=LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)
    def post(self,request):
        serializer= self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        logout(request)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
class RequestPasswordRestEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    def post(self,request):

        serializers=self.serializer_class(data=request.data)
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = reverse('password-reset',kwargs={'uidb64':uidb64,'token':token})
            absurl = 'http://' + current_site + relative_link
            email_body = 'Hello Use link below to reset your password \n '+"For reset password "+absurl +"\n"+"Your Old Password:"+ user.password2
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your Password'}
            Util.send_email(data)
        return Response({'sucess':'We have sent you a link of reset password'},status=status.HTTP_200_OK)
class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    def get(self,request,uidb64,token):
        try:
            id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=id)



            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'error':'Token is not valid request for new one'},status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success': True, 'message': 'creadentials Valid', 'uidb64': uidb64, 'token': token},status=status.HTTP_200_OK)
            #return redirect("https://team-csi-trainees.github.io/Raghav-Authentication/" ,{'success': True, 'message': 'creadentials Valid', 'uidb64': uidb64, 'token': token})
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error':'Token is not  valid'},status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class=SetNewPasswordSerializer
    def patch(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'sucess':True,'message':'Password reset success'},status=status.HTTP_200_OK)


# class VerifyTokenAPI(views.APIView):
#     allowed_methods = ["POST"]

#     def post(self, request, *args, **kwargs):
#         serializer = ReCaptchaSerializer(data=request.data)
#         if serializer.is_valid():
#             return Response({'success': True}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
