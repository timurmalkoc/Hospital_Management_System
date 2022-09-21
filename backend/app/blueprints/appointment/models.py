from app import db
from app.models import Personal
from app.blueprints.staff.models import Staff

class Appointment(db.Model):
    appointment_id =    db.Column(db.Integer, primary_key=True)
    appointment_date =  db.Column(db.DateTime(timezone=True), nullable=False)
    reason =            db.Column(db.String(400), nullable=True)
    status =            db.Column(db.Boolean, nullable=True, default=False)
    doctor_id =         db.Column(db.Integer, db.ForeignKey('staff.staff_id'), nullable=False)
    patient_id =        db.Column(db.Integer, db.ForeignKey('personal.personal_info_id'), nullable=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Appointment | {self.appointment_id}>"

    def to_dict(self):
        return{
            'appointment_id': self.appointment_id,
            'appointment_date': self.appointment_date,
            'reason': self.reason,
            'status': self.status,
            'doctor': Staff.query.get(self.doctor_id).to_dict(),
            'patient': Personal.query.get(self.patient_id).to_dict(),
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'appointment_id', 'time_slot', 'appointment_date','reason','doctor_id','patient_id'}:
                setattr(self, field, data[field])
        db.session.commit()

    def approve(self):
        self.status = True
        db.session.commit()

class Visit(db.Model):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    visit_id =          db.Column(db.Integer, primary_key = True)
    length =            db.Column(db.Numeric(5,2), nullable=True)
    weigth =            db.Column(db.Numeric(5,2), nullable=True)
    temp =              db.Column(db.Numeric(5,2), nullable=True)
    appointment_id =    db.Column(db.Integer, db.ForeignKey('appointment.appointment_id'), nullable=False)

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'length', 'weigth', 'temp','appointment_id'}:
                setattr(self, field, data[field])
        db.session.commit()

    def to_dict(self):
        return{
            'visit_id': self.visit_id,
            'height': self.length,
            'weight': self.weigth,
            'temp': self.temp,
            'appointment_id': self.appointment_id
        }

    def __repr__(self):
        return f"<Visit | {self.visit_id}>"

class Diagnose(db.Model):
    def __init__(self,**kwargs):
        super().__init__(**kwargs)
        db.session.add(self)
        db.session.commit()

    diagnose_id =       db.Column(db.Integer, primary_key = True)
    diagnose =          db.Column(db.String(1000), nullable=False)
    advice =            db.Column(db.String(1000), nullable=True)
    medicine =          db.Column(db.String(1000), nullable=True)
    dosage =            db.Column(db.String(1000), nullable=True)
    appointment_id =    db.Column(db.Integer, db.ForeignKey('appointment.appointment_id'), nullable=False)
    
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'diagnose', 'advice', 'medicine','dosage','appointment_id'}:
                setattr(self, field, data[field])
        db.session.commit()

    def to_dict(self):
        return{
            'diagnose_id': self.diagnose_id,
            'diagnose': self.diagnose,
            'advice': self.advice,
            'medicine': self.medicine,
            'dosage': self.dosage,
            'appointment_id': self.appointment_id
        }