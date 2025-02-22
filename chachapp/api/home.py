"""REST API for movies."""
import flask
from flask import (
    request
)
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required, JWTManager)
import random
import requests
import shutil
from imdb import Cinemagoer
import chachapp

jwt = JWTManager(chachapp.app)


@chachapp.app.route('/api/v1/', methods=["GET"])
def get_v1():
    """Return a list of available resources."""
    context = {
        "posts": "/api/v1/p/",
        "url": "/api/v1/"
    }
    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/<string:state>/', methods=["GET"])
def get_movies_in_state(state):
    """Return movies inrotation."""
    cur = chachapp.model.get_db()
    cur.execute("""SELECT * FROM movies m
                WHERE m.state=%s
                ORDER BY m.suggestedby""", (state,))
    movies = cur.fetchall()
    for movie in movies:
        movie['imdbrating'] = str(movie['imdbrating'])
        movie['filename'] = "/uploads/{}".format(movie['filename'])
        ratings_returned = get_ratings_helper(movie['movieid'])
        movie['ratings'] = ratings_returned['ratings']
        movie['average'] = ratings_returned['avg']

    context = {
        "movies": movies,
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/m/<string:movieid>/info/', methods=['GET'])
def get_movie_info(movieid):
    """Return movie info for movieid."""
    cur = chachapp.model.get_db()
    cur.execute("""SELECT * FROM movies m
                   WHERE m.movieid = %s""", (movieid,))
    movie = cur.fetchone()

    movie['imdbrating'] = str(movie['imdbrating'])
    movie['filename'] = "/uploads/{}".format(movie['filename'])
    ratings_returned = get_ratings_helper(movie['movieid'])
    movie['ratings'] = ratings_returned['ratings']
    movie['average'] = ratings_returned['avg']
    movie['genres'] = movie['genres']

    context = {
        "movie": movie,
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/m/<string:movieid>/comments/', methods=['POST'])
@jwt_required()
def post_movie_comment(movieid):
    """Return movie info for movieid."""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']
    request_data = request.get_json()
    text = request_data['commentText']

    cur.execute(""" INSERT INTO comments (owner, movieid, text)
                    VALUES (%s, %s, %s)
                """, (username, movieid, text))

    context = {'message': 'Comment posted successful',
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/m/<string:movieid>/comments/', methods=['GET'])
def get_movie_comments(movieid):
    """Return comments for movieid."""
    cur = chachapp.model.get_db()

    cur.execute(""" SELECT c.commentid, c.owner, c.text, r.filename, c.added
                    FROM comments c
                    JOIN reviewers r ON r.username = c.owner
                    WHERE movieid = %s
                    ORDER BY added ASC
                """, (movieid,))

    comments = cur.fetchall()

    for comment in comments:
        comment['filename'] = "/uploads/{}".format(comment['filename'])
        comment['added'] = "{}".format(comment['added'])

    context = {'comments': comments,
               'status_code': 200}

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/m/<string:movieid>/comments/<string:commentid>/', methods=["DELETE"])
@jwt_required()
def delete_movie_comment(movieid, commentid):
    """Delete comment with commentid."""
    cur = chachapp.model.get_db()

    user = get_jwt_identity()
    username = user['username']
    cur.execute(""" SELECT FROM comments
                    WHERE commentid = %s AND owner = %s AND movieid = %s
                """, (commentid, username, movieid))

    comments = cur.fetchall()

    if len(comments) != 1:
        response = {'movieid': movieid,
                    'commentid': commentid,
                    'user': username,
                    'message': 'Forbidden',
                    'status_code': 403}
        return response, 403

    cur.execute(""" DELETE FROM comments
                    WHERE commentid = %s
                """, (commentid,))
    count = cur.rowcount

    if count != 1:
        response = {'movieid': movieid,
                    'message': 'Invalid commentid',
                    'status_code': 400}
        return response, 400

    response = {'message': 'comment deleted succesfully',
                'status_code': 204}

    return response, 200


@chachapp.app.route('/api/v1/m/<string:movieid>/ratings/', methods=["GET"])
def get_ratings(movieid):
    """Return ratings for movieid."""
    ratings = get_ratings_helper(movieid)

    context = {
        "ratings": ratings['ratings'],
        "average": ratings['avg'],
    }
    return flask.jsonify(**context)


def get_ratings_helper(movieid):
    """Helper function for getting ratings"""
    cur = chachapp.model.get_db()
    cur.execute("""SELECT reviewer, rating FROM ratings r
                WHERE r.movieid=%s
                """, (movieid,))
    ratings_returned = cur.fetchall()

    ratings = []
    for row in ratings_returned:
        ratings.append(dict(row))

    for rating in ratings:
        if rating['rating'] is None:
            rating['rating'] = -1
        rating['rating'] = float(rating['rating'])

    cur.execute("""SELECT AVG(rating) FROM ratings r
                WHERE r.movieid=%s
                """, (movieid,))

    rating_avg = cur.fetchone()

    if rating_avg['avg'] is None:
        rating_avg['avg'] = -1
    else:
        rating_avg['avg'] = round(float(rating_avg['avg']), 2)
    ratings_dict = {"avg": rating_avg["avg"], "ratings": ratings}

    return ratings_dict


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


@chachapp.app.route('/api/v1/m/<string:movieid>/rate/', methods=["POST"])
@jwt_required()
def post_rating(movieid):
    """Rate movieid with given rating."""
    cur = chachapp.model.get_db()
    user = request.args.get('user')
    rating = request.args.get('rating')

    if rating.lower() == 'slept':
        rating = None
    cur.execute("""INSERT INTO ratings (movieid, reviewer, rating)
                VALUES (%s, %s, %s)
                ON CONFLICT(movieid,reviewer) DO UPDATE
                SET rating = EXCLUDED.rating""", (movieid, user, rating))

    count = cur.rowcount

    if count != 1:
        response = {'movieid': movieid,
                    'message': 'Invalid movieid',
                    'status_code': 400}
        return response, 400

    response = {'message': 'Rating submitted succesfully', 'status_code': 201}
    return response, 201


@chachapp.app.route('/api/v1/m/<string:movieid>/setstate/', methods=["PUT"])
@jwt_required()
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
                SET state = %s, added = CURRENT_TIMESTAMP
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
                ''', (movieid,))
    count = cur.rowcount

    if count != 1:
        response = {'movieid': movieid,
                    'message': 'Invalid movieid',
                    'status_code': 400}
        return response, 400

    response = {'message': 'resource deleted succesfully',
                'status_code': 200}
    return response, 200


@chachapp.app.route('/api/v1/u/<string:user>/addmovie/', methods=["POST"])
@jwt_required()
def add_movie(user):
    """Add new movie."""
    cur = chachapp.model.get_db()
    new_movie = request.get_json()
    new_movie = new_movie['movie']

    ia = Cinemagoer()
    movie = ia.get_movie(new_movie['imdbId'].replace('tt', ''))

    url = movie['full-size cover url']
    filename = movie['title'].replace(' ', '') + str(movie['year']) + 'coverphoto.jpg'
    response = requests.get(url, stream=True)
    path = chachapp.app.config["UPLOAD_FOLDER"] / filename

    if response.status_code == 200:
        with open(path, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)

    cur.execute('''INSERT INTO movies
                (movieid, title, year, director, filename,
                genres, imdbrating, state, suggestedby)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                ''', (movie['imdbID'], movie['title'], movie['year'],
                movie['directors'][0]['name'], filename, movie['genres'],
                movie['rating'], "ondeck", user))

    response = {'message': 'movie added succesfully',
                'status_code': 201}

    return response, 201


@chachapp.app.route('/api/v1/search/', methods=["GET"])
@jwt_required()
def search_movie():
    """Use Radarr API to search for query."""
    query = request.args.get('query')
    url = 'https://radarr.chachfilms.com/api/v3/movie/lookup?term=' \
        + query + '&apikey=7f5a36fb199f46e68eca4f0d476638ad'

    r = requests.get(url)

    if r.status_code > 299:
        response = {
            'message': 'Radarr could not be reached',
            'status_code': r.status_code}
        return response, r.status_code

    context = {
        "data": r.json(),
    }
    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/getMovieIds/', methods=["GET"])
@jwt_required()
def get_movieIds():
    """Get all movieIds."""

    cur = chachapp.model.get_db()
    cur.execute("""
                SELECT movieid FROM movies""")

    movieids = cur.fetchall()

    context = {
        "movieids": movieids,
    }
    return flask.jsonify(**context)


@chachapp.app.errorhandler(404)
def not_found(e):
    return flask.render_template("index.html")
