from concurrent.futures import thread
from . import user
from flask import jsonify, request
from app.models import Personal
from app.blueprints.user.models import User
import time
@user.route('/signup', methods=['POST'])
def user_signup():
    if not request.is_json:
        return jsonify({'error: Your request content-type must be application/json'}), 400

    data = request.json

    for field in {'email','first_name','last_name','phone','street','city','state','zip_code','birthday','username'}:
        if field not in data:
            return jsonify({'error':f"{field}' must be in resquest body"})
    
    exist_user = Personal.query.filter(Personal.email == data.get("email") or Personal.username == data.get("username")).all()

    if exist_user:
        return jsonify({'error':"Username is token"}),400

    Personal(email=data['email'], username=data['username'], password=data['password'], first_name=data['first_name'], middle_name=data['middle_name'],
            last_name=data['last_name'], phone=data['phone'], street=data['street'], city=data['city'], state=data['state'], zip_code=data['zip_code'], gender=data['gender'],
            birthday=data['birthday'], profile_img=data['profile_img'])
    

    personal = Personal.query.filter(Personal.email == data.get('email')).first()

    User(personal_info_id=personal.personal_info_id)

    return jsonify({'success':'New user is created successfully !'}), 201