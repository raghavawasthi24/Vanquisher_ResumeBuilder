from rest_framework import serializers
from account.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib import auth 
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str,force_str,smart_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type':'password'},write_only=True)

   
    class Meta:
        model = User
        fields = ['mobile_number','email','full_name','gender','age','password','password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

    def validate(self, attrs):
       password = attrs.get('password')
       password2=attrs.get('password2')
       if password != password2:
        raise serializers.ValidationError("Passwords are not matching")
       return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']
class LoginSerializer(serializers.ModelSerializer):
    mobile_number=serializers.CharField(max_length=10)
    password=serializers.CharField(max_length=68,write_only=True)
    tokens=serializers.CharField(read_only=True)
    class Meta:
        model=User
        fields=['mobile_number','password','tokens'] 
    def validate(self,attrs):
        mobile_number=attrs.get('mobile_number','')
        password=attrs.get('password','')

        user=auth.authenticate(mobile_number=mobile_number,password=password)
      
        if not user:
            raise AuthenticationFailed('Mobile number or Password is Incorrect!')
        if not user.isverified:
            raise AuthenticationFailed('Email is not Verified!')
        return {
            'mobile_number':user.mobile_number,
            'full_name':user.full_name,
            'email':user.email,
            'tokens':user.tokens
        }



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','mobile_number','email','full_name','age','mobile_number']

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    

    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self,attrs):
        self.token= attrs['refresh']
        return attrs


    def save(self,**kwargs):
        try:
            RefreshToken(self.token).blacklist()
        
        
        except TokenError:
            self.fail('bad_token')

class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email=serializers.EmailField(min_length=2)
    class Meta:
        model=User
        fields=['email'] 
    def validate(self,attrs):
        email=attrs.get('email','')

        user=auth.authenticate(email=email)
        if not user:
            raise AuthenticationFailed('Email is Incorrect!')
        if not user.isverified:
            raise AuthenticationFailed('Email is not Verified!')
        return {
            'email':user.email,
        }
class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(min_length=6,max_length=68,write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)
    class Meta :
        fields=['password','token','uidb64']
    def validate(self,attrs):
        try:
            password = attrs.get('password')
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')

            id =force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)