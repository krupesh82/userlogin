from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.linkedin_oauth2.views import LinkedInOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from django.http import HttpResponse
from django.shortcuts import render
import json

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class LinkedInLogin(SocialLoginView):
    adapter_class = LinkedInOAuth2Adapter

def AccountConfirmed(request):
    # return HttpResponse(json.dumps({ 'detail': 'Email is confirmed and your account is activated now.' }), 'application/json')
    return render(request, 'account/account_activated.html', {'status' : 'activated'})