"""
Chachapp common configuration
Ryan Magayr <magyar.ryan@gmail.com>
"""

import os
import pathlib


basedir = os.path.abspath(os.path.dirname(__file__))


SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
SQLALCHEMY_TRACK_MODIFICATIONS = False
STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/chachapp/static"
MEDIA_FOLDER = f"{os.getenv('APP_FOLDER')}/chachapp/media"
# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
APP_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = APP_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
