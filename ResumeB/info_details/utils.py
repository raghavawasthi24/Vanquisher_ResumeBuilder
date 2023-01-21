from django.core.mail import EmailMessage
emails=[]
class Util:
    @staticmethod
    def send_email(data):
        for email_1 in data['to_email']:
            email=EmailMessage(subject=data['email_subject'],body=data['email_body'],to=(email_1,))
            email.send()