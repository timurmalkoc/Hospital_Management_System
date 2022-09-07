from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import Personal
from datetime import datetime

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(username, password):
    user = Personal.query.filter_by(username=username).first()
    if user is not None and user.check_password(password):
        return user

@token_auth.verify_token
def verify(token):
    user = Personal.query.filter_by(token=token).first()
    if user and user.token_expiration > datetime.utcnow():
        return user