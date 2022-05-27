import os
from werkzeug.utils import secure_filename
import flask


app = flask.Flask(__name__)
app.config.from_object("chachapp.config_common")

if app.config["ENV"] == "development":
    app.config.from_object('chachapp.config_dev')
else:
    app.config.from_object('chachapp.config_prod')

import chachapp.api
import chachapp.model
import chachapp.views
