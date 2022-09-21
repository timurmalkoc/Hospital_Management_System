import os
import base64
from datetime import datetime, timedelta
from enum import unique
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class Personal(db.Model):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.set_password(kwargs['password'])
        db.session.add(self)
        db.session.commit()
    personal_info_id =  db.Column(db.Integer, primary_key=True)
    email =             db.Column(db.String(50), nullable=False, unique = True)
    username =          db.Column(db.String(50), nullable=False, unique = True)
    password =          db.Column(db.String(256), nullable=False)
    first_name =        db.Column(db.String(50), nullable=False)
    middle_name =       db.Column(db.String(50), nullable=True)
    last_name =         db.Column(db.String(50), nullable=False)
    phone =             db.Column(db.String(10), nullable=True)
    street =            db.Column(db.String(50), nullable = False)
    city =              db.Column(db.String(50), nullable = False)
    state =             db.Column(db.String(50), nullable = False)
    zip_code =          db.Column(db.String(10), nullable = False)
    gender =            db.Column(db.String(5), nullable = True)
    birthday =          db.Column(db.DateTime, nullable = False)
    created_date =      db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    active =            db.Column(db.Boolean, nullable=True, default=False)
    profile_img =       db.Column(db.String(255), nullable=True)
    token =             db.Column(db.String(32), index=True, unique=True)
    token_expiration =  db.Column(db.DateTime)

    def to_dict(self):
        return {
            'personal_info_id': self.personal_info_id,
            'user_name': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'gender': self.gender,
            'birthday': self.birthday,
            'created_date': self.created_date,
            'active': self.active,
            'profile_img': self.profile_img
    }

    def __repr__(self):
        return f'<Class PersonalInfo|id:{self.personal_info_id}>'


    def set_password(self, password):
        self.password = generate_password_hash(password)
        db.session.commit()

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update(self, data):
        for field in data:
            if field in {'personal_info_id','email','first_name','middle_name','last_name','phone','street','city','zip_code','gender','birthday','created_date','active','profile_img'}:
                setattr(self, field, data[field])
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')  # genereate random token
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.commit()
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)
        db.session.commit()   

    def activate(self):
        self.active = True
        db.session.commit()

    def deactivate(self):
        self.active = False
        db.session.commit()