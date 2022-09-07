import os

base_path = os.path.abspath(os.path.dirname(__file__))
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'erhp32145j23lkj4h53hj45j3l245'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://'+os.environ.get("DB_USERNAME")+':'+os.environ.get("DB_PASSWORD")+'@localhost/hms'
    SQLALCHEMY_TRACK_MODIFICATIONS = False