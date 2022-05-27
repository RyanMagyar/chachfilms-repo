"""
chachapp index (main) view.

URLs include:
/
"""
import flask
import arrow
from flask import (
    redirect, session, url_for, send_from_directory, abort, jsonify
)
import chachapp
import sys

@chachapp.app.route('/')
def show_index():
    cur = chachapp.model.get_db()
    cur.execute("SELECT * FROM movies")
    movies = cur.fetchall()
    for movie in movies:
        movie['imdbrating'] =  str(movie['imdbrating'])

    # Add database info to context
    context = {"movies": movies}
    return flask.render_template("index.html", **context)

@chachapp.app.route('/uploads/<file>')
def show_image(file):
    """Display / route."""

    path = chachapp.app.config["UPLOAD_FOLDER"]/file
    if not path.is_file():
        abort(410)

    return send_from_directory(chachapp.app.config['UPLOAD_FOLDER'],
                               file, as_attachment=True)
