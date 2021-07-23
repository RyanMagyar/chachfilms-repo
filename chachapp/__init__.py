import os
from werkzeug.utils import secure_filename
import flask
from flask_sqlalchemy import SQLAlchemy


app = flask.Flask(__name__)
app.config.from_object("chachapp.config.Config")

import chachapp.views
import chachapp.model
import chachapp.api






