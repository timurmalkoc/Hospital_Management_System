from app import app
from flask import render_template, jsonify, request
from app.blueprints.auth.basic_auth import token_auth, get_user_type
from app.models import Personal
from app.blueprints.staff.models import Staff

@app.route('/')
def index():
    return render_template('index.html')

# ================================= user =====================================
# user freeze
@app.route('/freeze', methods=['PUT'])
@token_auth.login_required
def freeze_account():
    current_user = token_auth.current_user()
    current_user.deactivate()
    return jsonify({'success': 'Person account has been activated'}), 200

# get current user info
@app.route('/personalinfo')
@token_auth.login_required
def get_user_info():
    current_user = token_auth.current_user()
    person = Personal.query.get_or_404(current_user.personal_info_id)
    return jsonify(person.to_dict()), 201

# update user info
@app.route('/updatepersonalinfo/<int:person_id>', methods=['PUT'])
@token_auth.login_required
def update_person_info(person_id):
    current_user = token_auth.current_user()
    if current_user.personal_info_id == person_id:
        data = request.json
        current_user.update(data)
        return jsonify({'success':'User info has been updated successfully'}), 200
    return jsonify({'error': 'You do not have permission to update this user'}), 403


# get doctor list
@app.route('/doctorlist')
@token_auth.login_required
def get_doctor():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'patient':
        staff = Staff.query.filter(Staff.role == 'Doctor').all()
        return jsonify([s.to_dict() for s in staff]),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# get doctor by id
@app.route('/doctor/<int:doctor_id>')
@token_auth.login_required
def get_doctor_by_id(doctor_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'patient':
        doctor = Staff.query.filter(Staff.personal_info_id == doctor_id).first()
        return jsonify(doctor.to_dict()),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# ================================ admin ===================================
# de-active accounts
@app.route('/newusers')
@token_auth.login_required
def new_users():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'admin':
        users = Personal.query.filter(Personal.active==False).all()
        return jsonify([user.to_dict() for x,user in enumerate(users)]),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# active accounts
@app.route('/active')
@token_auth.login_required
def active_users():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'admin':
        users = Personal.query.filter(Personal.active==True).all()
        return jsonify([user.to_dict() for x,user in enumerate(users)]),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# activate a new account
@app.route('/activateuser/<int:user_id>', methods=['PUT'])
@token_auth.login_required
def activate_user_accout(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'admin':
        person = Personal.query.filter(Personal.personal_info_id==user_id).first()
        person.activate()
        return jsonify({'success': 'Person account has been activated'}), 200    
    return jsonify({'error': 'You do not have permission to this action'}), 403

# deactivate a new account
@app.route('/deactivateuser/<int:user_id>', methods=['PUT'])
@token_auth.login_required
def deactivate_user_accout(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() == 'admin':
        person = Personal.query.filter(Personal.personal_info_id==user_id).first()
        person.deactivate()
        return jsonify({'success': 'Person account has been deactivated'}), 200    
    return jsonify({'error': 'You do not have permission to this action'}), 403

# add new staff
@app.route('/newstaff', methods=['POST'])
@token_auth.login_required
def new_staff():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type.lower() != 'admin':
        return jsonify({'error': 'You do not have permission to this action'}), 403

    if not request.is_json:
        return jsonify({'error: Your request content-type must be application/json'}), 400

    data = request.json

    for field in {'email','first_name','last_name','phone','street','city','state','zip_code','birthday','username','role','department','started_date'}:
        if field not in data:
            return jsonify({'error':f"{field}' must be in resquest body"})
    
    exist_user = Personal.query.filter(Personal.email == data.get("email") or Personal.username == data.get("username")).all()

    if exist_user:
        return jsonify({'error':"Username is token"}),400

    Personal(email=data['email'], username=data['username'], password=data['password'], first_name=data['first_name'], middle_name=data['middle_name'],
            last_name=data['last_name'], phone=data['phone'], street=data['street'], city=data['city'], state=data['state'], zip_code=data['zip_code'], gender=data['gender'],
            birthday=data['birthday'], profile_img=data['profile_img'], active=True)
    

    personal = Personal.query.filter(Personal.email == data.get('email')).first()
    Staff(personal_info_id=personal.personal_info_id, department=data['department'], role=data['role'], started_date=data['started_date'])

    return jsonify({'success':'New user is created successfully !'}), 201

# Update staff
@app.route('/updatestaff/<int:user_id>', methods=['PUT'])
@token_auth.login_required
def update_staff(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    print(user_type)
    if user_type.lower() != 'admin':
        return jsonify({'error': 'You do not have permission to this action'}), 403

    if not request.is_json:
        return jsonify({'error: Your request content-type must be application/json'}), 400

    data = request.json
    
    user = Personal.query.filter(Personal.personal_info_id == user_id).first()
    staff = Staff.query.filter(user.personal_info_id == Staff.personal_info_id).first()

    if user and staff:
        user.update(data)
        staff.update(data)
        return jsonify({'success':'New user is created successfully !'}), 201

# staff list
@app.route('/stafflist')
@token_auth.login_required
def staff_list():
    user_type = get_user_type(token_auth.current_user().token)
    if user_type == 'admin' or user_type == 'Admin':
        staff = Staff.query.all()
        return jsonify([s.to_dict() for s in staff]),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# get staff with user id
@app.route('/stafflist/<int:user_id>')
@token_auth.login_required
def get_staff(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type == 'admin' or user_type == 'Admin':
        person = Personal.query.get_or_404(user_id)
        staff = Staff.query.filter(person.personal_info_id == Staff.personal_info_id).first()
        return jsonify(staff.to_dict()),200
    return jsonify({'error': 'You do not have permission to this action'}), 403

# get user with id
@app.route('/personalinfo/<int:user_id>')
@token_auth.login_required
def get_staff_info(user_id):
    user_type = get_user_type(token_auth.current_user().token)
    if user_type == 'admin' or user_type == 'Admin':
        person = Personal.query.get_or_404(user_id)
        return jsonify(person.to_dict()), 201