from app import app
from flask import render_template, jsonify, request
from app.blueprints.auth.basic_auth import token_auth, get_user_type
from app.models import Personal

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/personalinfo')
@token_auth.login_required
def get_user_info():
    current_user = token_auth.current_user()
    person = Personal.query.get_or_404(current_user.personal_info_id)
    return jsonify(person.to_dict()), 201


@app.route('/updatepersonalinfo/<int:person_id>', methods=['PUT'])
@token_auth.login_required
def update_person_info(person_id):
    current_user = token_auth.current_user()
    if current_user.personal_info_id == person_id:
        data = request.json
        current_user.update(data)
        return jsonify({'success':'User info has been updated successfully'}), 200
    return jsonify({'error': 'You do not have permission to update this user'}), 403


# ==================== admin =======================
# check di-active accounts
@app.route('/newusers')
@token_auth.login_required
def new_users():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type == 'admin':
        users = Personal.query.filter(Personal.active==False).all()
        return jsonify([user.to_dict() for x,user in enumerate(users)]),200
    return jsonify({'error': 'You do not have permission to this action'}), 403
    
# activate a new account
@app.route('/activateuser/<int:user_id>', methods=['PUT'])
@token_auth.login_required
def activate_user_accout(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type == 'admin':
        person = Personal.query.filter(Personal.personal_info_id==user_id).first()
        person.activate()
        return jsonify({'success': 'Person account has been activated'}), 200    
    return jsonify({'error': 'You do not have permission to this action'}), 403
