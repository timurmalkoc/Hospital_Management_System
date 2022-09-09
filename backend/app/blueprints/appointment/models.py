from app import db
from app.blueprints.user.models import User
from app.blueprints.staff.models import Staff

class Appointment(db.Model):
    appointment_id =    db.Column(db.Integer, primary_key=True)
    time_slot =         db.Column(db.Time, nullable=False)
    appointment_date =  db.Column(db.DateTime, nullable=False)
    reason =            db.Column(db.String(400), nullable=True)
    status =            db.Column(db.Boolean, nullable=True, default=False)
    doctor_id =         db.Column(db.Integer, db.ForeignKey('staff.staff_id'), nullable=False)
    patient_id =        db.Column(db.Integer, db.ForeignKey('user.patient_id'), nullable=False)

    def __init__(self, **Kwargs):
        super().__init__()
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Appointment | {self.appointment_id}>"

    def to_dict(self):
        return{
            'appointment_id': self.appointment_id,
            'time_slot': self.time_slot,
            'appointment_date': self.appointment_date,
            'reason': self.reason,
            'status': self.status,
            'doctor': Staff.query.get(self.doctor_id).to_dict(),
            'patient': User.query.get(self.patient_id)
        }

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for field in data:
            if field in {'appointment_id', 'time_slot', 'appointment_date','reason','doctor_id','patient_id'}:
                setattr(self, field, data[field])
        db.session.commit()