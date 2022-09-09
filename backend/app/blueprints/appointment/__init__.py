from flask import Blueprint

appointment = Blueprint('appointment', __name__, url_prefix='/appointment')

from . import models