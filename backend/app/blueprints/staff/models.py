from app import db
from app.models import Personal

# ======================================================# staff #====================================================== #

class Staff(db.Model):
    staff_id =          db.Column(db.Integer, primary_key = True)
    department =        db.Column(db.String(50), nullable=False)
    role =              db.Column(db.String(50), nullable=False)
    started_date =      db.Column(db.DateTime(), nullable=False)
    personal_info_id =  db.Column(db.Integer, db.ForeignKey('personal.personal_info_id'), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Staff | {self.staff_id}>"

    def to_dict(self):
        return{
            'staff_id': self.staff_id,
            'department': self.department,
            'role': self.role,
            'started_date': self.started_date,
            'personal_info_id': self.personal_info_id,
            'personal': Personal.query.get(self.personal_info_id).to_dict()
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'staff_id', 'department', 'role','started_date','personal_info_id'}:
                setattr(self, field, data[field])
        db.session.commit()


# ======================================================# qualification #====================================================== #

class Qualificaiton(db.Model):
    qualificaiton_id =      db.Column(db.Integer, primary_key = True)
    qualificaiton_type =    db.Column(db.String(50), nullable=False)
    issued_date =           db.Column(db.DateTime(), nullable=True)
    expire_date =           db.Column(db.DateTime(), nullable=True)
    staff_id =              db.Column(db.Integer, db.ForeignKey('staff.staff_id'), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Qualificaiton | {self.qualificaiton_id}>"

    def to_dict(self):
        return{
            'qualificaiton_id': self.qualificaiton_id,
            'qualificaiton_type': self.qualificaiton_type,
            'issued_date': self.issued_date,
            'expire_date': self.expire_date,
            'staff': Staff.query.get(self.staff_id).to_dict()
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'qualificaiton_id', 'qualificaiton_type', 'issued_date','expire_date','staff_id'}:
                setattr(self, field, data[field])
        db.session.commit()

    