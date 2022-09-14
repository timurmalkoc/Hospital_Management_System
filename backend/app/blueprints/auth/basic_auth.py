from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.models import Personal
from datetime import datetime
from app.blueprints.user.models import User
from app.blueprints.staff.models import Staff
from flask import jsonify

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


def get_user_type(token):
    user = Personal.query.filter_by(token=token).first()
    user_type = ''
    if user and User.query.filter(User.personal_info_id==user.personal_info_id).all():
        user_type = 'patient'
    elif user and Staff.query.filter(Staff.personal_info_id==user.personal_info_id).all():
        user_type = Staff.query.filter(Staff.personal_info_id==user.personal_info_id).first().role
    return user_type