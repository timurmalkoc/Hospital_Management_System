from app import db
from app.models import Personal

# ======================================================# patient #====================================================== #

class User(db.Model):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()
    patient_id =        db.Column(db.Integer, primary_key = True)
    personal_info_id =  db.Column(db.Integer, db.ForeignKey('personal.personal_info_id'), nullable=False)
    insurance_id =      db.Column(db.Integer, db.ForeignKey('insurance.insurance_id'), nullable=True)


    def __repr__(self):
        return f"<User {self.patient_id}>"

    def to_dict(self):
        return{
            'patient_id': self.patient_id,
            'personal_info': Personal.query.get(self.personal_info_id).to_dict(),
            'insurance': Insurance.query.get(self.insurance_id)
        }

# ======================================================# insurance #====================================================== #

class Insurance(db.Model):
    insurance_id =  db.Column(db.Integer, primary_key = True)
    name =          db.Column(db.String(100), nullable=False)
    phone =         db.Column(db.String(15), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Insurance {self.insurance_id}|{self.name}>"

    def to_dict(self):
        return{
            'insurance_id': self.insurance_id,
            'name': self.name,
            'phone': self.phone
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'name','phone'}:
                setattr(self, field, data[field])
        db.session.commit()    

# ======================================================# invoice #====================================================== #

class Invoice(db.Model):
    invoce_id =     db.Column(db.Integer, primary_key = True)
    room_charge =   db.Column(db.Numeric(10,2), default=0)
    medicine_cost = db.Column(db.Numeric(10,2), default=0)
    doctor_charge = db.Column(db.Numeric(10,2), default=0)
    other_charge =  db.Column(db.Numeric(10,2), default=0)
    total =         db.Column(db.Numeric(10,2), default=0)
    insurance_id =  db.Column(db.Integer, db.ForeignKey('insurance.insurance_id'), nullable=True)
    patient_id =    db.Column(db.Integer, db.ForeignKey('user.patient_id'), nullable=False)
    staff_id =      db.Column(db.Integer, db.ForeignKey('staff.staff_id'), nullable=False)     # person who prepared the bill
    prepared_date = db.Column(db.DateTime)


    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Invoice {self.invoce_id}|{self.patient_id}>"

    def to_dict(self):
        return{
            'room_charge': self.room_charge,
            'medicine_cost': self.medicine_cost,
            'doctor_charge': self.doctor_charge,
            'other_charge': self.other_charge,
            'total': self.total,
            'insurance_id': self.insurance_id,
            'patient_id': self.patient_id,
            'staff_id': self.staff_id
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'room_charge','medicine_cost','doctor_charge','other_charge','total','insurance_id','patient_id','staff_id'}:
                setattr(self, field, data[field])
        db.session.commit()


# ======================================================# medical history #====================================================== #

