from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.blueprints.auth import auth
app.register_blueprint(auth)

from app.blueprints.user import user
app.register_blueprint(user)

from app.blueprints.staff import staff
app.register_blueprint(staff)

from app.blueprints.appointment import appointment
app.register_blueprint(appointment)

from . import models, routes
