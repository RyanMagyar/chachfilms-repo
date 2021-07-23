import os
import pathlib


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/chachapps/static"
    MEDIA_FOLDER = f"{os.getenv('APP_FOLDER')}/chachapp/media"
    # Root of this application, useful if it doesn't occupy an entire domain
    APPLICATION_ROOT = '/'

    # Secret key for encrypting cookies
    SECRET_KEY = b'\n\x9dvyk\x90\x11Z/\xba#\xce~mG,\x1d-\x97\xe3Q\x01\xc4\x1f'
    SESSION_COOKIE_NAME = 'login'

    # File Upload to var/uploads/
    APP_ROOT = pathlib.Path(__file__).resolve().parent.parent
    UPLOAD_FOLDER = APP_ROOT/'var'/'uploads'
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    # Database
    POSTGRESQL_DATABASE_HOST = "localhost"
    POSTGRESQL_DATABASE_PORT = 5432
    POSTGRESQL_DATABASE_USER = "ryanmagyar" # OS or WSL username
    POSTGRESQL_DATABASE_PASSWORD = None
    POSTGRESQL_DATABASE_DB = "chachfilms"

