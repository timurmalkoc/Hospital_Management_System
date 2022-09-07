from . import auth
from .basic_auth import basic_auth
from flask import jsonify

@auth.route('/token')
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    return jsonify({'token': token, 'token_expiration': user.token_expiration}) 