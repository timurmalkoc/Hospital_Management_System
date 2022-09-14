from . import auth
from .basic_auth import basic_auth
from flask import jsonify
from app.blueprints.user.models import User
from app.blueprints.staff.models import Staff

# ================================ Login All Users =================================
@auth.route('/token', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    if not user.active:
        return jsonify({'error': "Your account haven't been activated !" }), 400

    token = user.get_token()
    user_type = ''
    if User.query.filter(User.personal_info_id == user.personal_info_id).all():
        user_type = 'patient'
    elif Staff.query.filter(Staff.personal_info_id == user.personal_info_id).all():
        user_type = Staff.query.filter(Staff.personal_info_id == user.personal_info_id).first().role
    
    return jsonify({'token': token, 'token_expiration': user.token_expiration, 'user_type':user_type, 'profile_img':user.profile_img, 'username':user.username }) 


