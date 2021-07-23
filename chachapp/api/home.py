"""REST API for movies."""
import flask
from flask import (
    session, request
)
import random
import chachapp


@chachapp.app.route('/api/v1/', methods=["GET"])
def get_v1():
    """Return a list of available resources."""
    context = {
        "posts": "/api/v1/p/",
        "url": "/api/v1/"
    }
    return flask.jsonify(**context)

@chachapp.app.route('/api/v1/inrotation/', methods=["GET"])
def get_on_deck():
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
def set_movie_state(movieid):
    """Set movieid's state to state arg."""
    validStates = ['watched', 'inrotation', 'ondeck']
    newState = request.args.get('state')
    
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

    

@chachapp.app.errorhandler(404)   
def not_found(e):   
  return flask.render_template("index.html")