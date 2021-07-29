"""REST API for movies."""
import flask
from flask import (
    session, request
)
from flask_jwt_extended import (
    create_access_token, get_jwt_identity,
    jwt_required, JWTManager)
import json
import random
import requests
import shutil
from imdb import IMDb
import chachapp

jwt = JWTManager(chachapp.app)

@chachapp.app.route('/api/v1/', methods=["GET"])
def get_v1():
    """Return a list of available resources."""
    context = {
        "posts": "/api/v1/p/",
        "url": "/api/v1/"
    }
    user = get_jwt_identity()
    print(user)
    return flask.jsonify(**context)

@chachapp.app.route('/api/v1/inrotation/', methods=["GET"])
def get_in_rotation():
    """Return movies inrotation."""
    cur = chachapp.model.get_db()
    cur.execute("""SELECT * FROM movies m
                WHERE m.state='inrotation' 
                ORDER BY m.suggestedby""")
    movies = cur.fetchall()
    for movie in movies:
        movie['imdbrating'] =  str(movie['imdbrating'])
        movie['filename'] = "/uploads/{}".format(movie['filename'])
    
    context = {
        "movies": movies,
    }
    return flask.jsonify(**context)

@chachapp.app.route('/api/v1/ondeck/', methods=["GET"])
def get_on_deck():
    """Return movies inrotation."""
    cur = chachapp.model.get_db()
    cur.execute("""SELECT * FROM movies m
                WHERE m.state='ondeck' 
                ORDER BY m.suggestedby""")
    movies = cur.fetchall()
    for movie in movies:
        movie['imdbrating'] =  str(movie['imdbrating'])
        movie['filename'] = "/uploads/{}".format(movie['filename'])
    
    context = {
        "movies": movies,
    }
    return flask.jsonify(**context)

@chachapp.app.route('/api/v1/roll/<string:picked_last>/', methods=["GET"])
def get_roll(picked_last):
    """Return random movie not from user who picked last."""
    cur = chachapp.model.get_db()
    cur.execute('''SELECT title FROM movies m
                WHERE m.state='inrotation' AND m.suggestedby <> %s''', (picked_last,))

    movies = cur.fetchall()
    context = {
        "movie": random.choice(movies),
    }
    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/m/<string:movieid>/setstate/', methods=["PUT"])
@jwt_required()
def set_movie_state(movieid):
    """Set movieid's state to state arg."""
    validStates = ['watched', 'inrotation', 'ondeck']
    newState = request.args.get('state')
    user = get_jwt_identity()
    
    if newState not in validStates:
        response = {'state': newState,
                    'message': 'State is not a valid state', 
                    'status_code': 400}
        return response, 400
    
    cur = chachapp.model.get_db()
    cur.execute(''' UPDATE movies
                SET state = %s
                WHERE movieid = %s
                ''', (newState, movieid))
    count = cur.rowcount
    
    if count != 1:
        response = {'movieid': movieid,
                    'message': 'Invalid movieid', 
                    'status_code': 400}
        return response, 400
    
    response = {'message': 'OK', 'status_code': 200}
    return response, 200

@chachapp.app.route('/api/v1/m/<string:movieid>/delete/', methods=["DELETE"])
@jwt_required()
def delete_movie(movieid):
    """Delete movie with movieid."""
    cur = chachapp.model.get_db()
    cur.execute('''DELETE FROM movies
                WHERE movieid = %s
                ''',(movieid,))
    count = cur.rowcount
    
    if count != 1:
        response = {'movieid': movieid,
                    'message': 'Invalid movieid', 
                    'status_code': 400}
        return response, 400
    
    response = {'message': 'resource deleted succesfully',
                'status_code': 204}
    return response, 204

@chachapp.app.route('/api/v1/u/<string:user>/addmovie/', methods=["POST"])
@jwt_required()
def add_movie(user):
    """Add new movie."""
    cur = chachapp.model.get_db()
    new_movie = request.get_json()
    new_movie = new_movie['movie']

    radarr_reponse = addToRadarr(new_movie)
    
    if radarr_reponse > 299:
        response = {'movie': new_movie['title'],
                    'message': 'Radarr could not be reached', 
                    'status_code': radarr_reponse}
        return response, radarr_reponse
    
    ia = IMDb()
    movie = ia.get_movie(new_movie['imdbId'].replace('tt',''))
    
    url = movie['full-size cover url']
    filename = movie['title'].replace(' ', '') + str(movie['year']) + 'coverphoto.jpg'
    response = requests.get(url, stream=True)
    path = chachapp.app.config["UPLOAD_FOLDER"]/filename

    if response.status_code == 200:
        with open (path, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
    
    cur.execute('''INSERT INTO movies
                (movieid, title, year, director, filename, 
                genres, imdbrating, state, suggestedby) 
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                ''',(movie['imdbID'], movie['title'], movie['year'],
                     movie['directors'][0]['name'], filename, movie['genres'], 
                     movie['rating'], "ondeck", user))
    
    
    
    response = {'message': 'movie added succesfully',
                'status_code': 201}
    
    return response, 201

def addToRadarr(movie):
    movie['folderName'] = "/movies/" + movie['folder']
    movie['rootFolderPath'] = "/movies/"
    movie['monitored'] = True
    movie['qualityProfileId'] = 4
    movie['addOptions'] = {'searchForMovie': True}
    
    r = requests.post('http://192.168.0.33:7878/api/v3/movie?apikey=7f5a36fb199f46e68eca4f0d476638ad', json.dumps(movie))
    return r.status_code
    

    

@chachapp.app.errorhandler(404)   
def not_found(e):   
  return flask.render_template("index.html")

