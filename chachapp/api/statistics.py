"""REST API for statistics."""
import flask
from chachapp.api.home import get_ratings_helper
from flask_jwt_extended import (
        JWTManager)

import chachapp

jwt = JWTManager(chachapp.app)

@chachapp.app.route('/api/v1/statistics/averages/', methods=["GET"])
def get_user_average():
    """Return averages of movies suggested by users."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                SELECT averages.suggestedby, AVG(averages.avg), COUNT(DISTINCT averages.title) 
                FROM (
                    SELECT m.title, m.suggestedby, AVG(r.rating) 
                    FROM movies m JOIN ratings r ON r.movieid = m.movieid AND m.state='watched' 
                    GROUP BY m.movieid
                    ) averages 
                    GROUP BY averages.suggestedby
                """)
    
    averages = cur.fetchall()

    for average in averages:
        average['avg'] = round(float(average['avg']), 2)
    context = {
        "averages": averages
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/statistics/nulls/', methods=["GET"])
def get_num_nulls():
    """Return numbers of nulls."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                 SELECT r.username, COUNT(rate.reviewer) 
                 FROM reviewers r 
                 LEFT OUTER JOIN ratings rate 
                 ON r.username = rate.reviewer AND rate.rating is NULL 
                 GROUP BY r.username;
                """)
    
    nulls = cur.fetchall()

    context = {
        "nulls": nulls
    }

    return flask.jsonify(**context)

    
@chachapp.app.route('/api/v1/statistics/genres/', methods=["GET"])
def get_genre_counts():
    """Return counts of watched movies for each genre."""
    cur = chachapp.model.get_db()

    genres_list = [{'genre' : 'Comedy'}, {'genre' : 'Thriller'}, { 'genre' : 'Action'}, { 'genre' : 'Drama'}, 
                   {'genre' : 'Sci-Fi'}, {'genre' : 'Horror'}]
    
    for genre in genres_list:
        
        cur.execute("""
               SELECT r.username, r.filename, COUNT(m.suggestedby) 
               FROM reviewers r 
               LEFT OUTER JOIN movies m 
               ON r.username = m.suggestedby AND m.genres @> ARRAY[%s]::varchar[] AND m.state='watched' 
               GROUP BY r.username
                """, (genre['genre'],))

        results = cur.fetchall()
        
        for row in results:
            genre[row['username']] = row['count']
   
    
    context = {
        "genre_counts": genres_list
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/statistics/pics/', methods=["GET"])
def get_pictures():
    """Return filename for each user."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                SELECT r.username, r.filename
                FROM reviewers r
                """
    )
    
    results = cur.fetchall()
    

    context = {
        "files" : results
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/statistics/averagesdiff/', methods=["GET"])
def get_averages_difference():
    """Return difference of user averages."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                SELECT a.suggestedby, a.notsuggested, b.suggested, (b.suggested - a.notsuggested) AS diff 
                FROM (SELECT c.suggestedby, AVG(c.notsuggested) AS notsuggested 
                      FROM (SELECT m.suggestedby, AVG(r.rating) AS notSuggested
                            FROM ratings r
                            JOIN movies m ON m.movieid = r.movieid AND r.reviewer <> m.suggestedby AND m.state='watched'
                            GROUP BY m.movieid
                            ) c 
                            GROUP BY c.suggestedby
                      ) a 
                JOIN (SELECT m.suggestedby, AVG(r.rating) AS suggested 
                      FROM ratings r 
                      JOIN movies m ON m.movieid = r.movieid AND r.reviewer = m.suggestedby AND m.state='watched'
                      GROUP BY m.suggestedby
                      ) b 
                ON a.suggestedby = b.suggestedby
                """)
    
    averages = cur.fetchall()
    
    for average in averages:
        average['notsuggested'] = round(float(average['notsuggested']), 2)
        average['suggested'] = round(float(average['suggested']), 2)
        average['diff'] = round(float(average['diff']), 2)

    context = {
        "averages" : averages
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/statistics/latestmovies/', methods=["GET"])
def get_latest_movies():
    """Return last 5 movies averages for each user."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                SELECT rank_filter.* 
                FROM (
                    SELECT items.*, rank() OVER(
                        PARTITION BY suggestedby
                        ORDER BY added DESC) 
                    FROM (SELECT m.title, m.suggestedby, m.added, AVG(r.rating) 
                          FROM movies m 
                          JOIN ratings r ON m.movieid=r.movieid AND m.state='watched' 
                          GROUP BY m.movieid 
                          ORDER BY added DESC
                    ) items
                ) rank_filter 
                WHERE RANK < 6
                """)
    
    movies = cur.fetchall()

    averagesResults = {1 : {}, 2 : {}, 3 : {}, 3 : {}, 5 : {}}
    for movie in movies:
       averagesResults[movie['rank']][movie['suggestedby']] = round(float(movie['avg']), 2)  
       averagesResults[movie['rank']]['rank'] = movie['rank']
       averagesResults[movie['rank']]['title' + movie['suggestedby']] = movie['title']
       movie[movie['suggestedby']] = round(float(movie['avg']), 2) 
       del movie['avg']
       del movie['suggestedby']
       
    context = {
        "movies" : list(averagesResults.values())
    }

    return flask.jsonify(**context)


@chachapp.app.route('/api/v1/statistics/highlowmovies/', methods=["GET"])
def get_highlow_movies():
    """Return highest and lowest rated movie for each user."""
    cur = chachapp.model.get_db()
    
    cur.execute("""
                SELECT DISTINCT ON (a.suggestedby) a.* FROM (SELECT m.*, AVG(r.rating)
                    FROM movies m JOIN ratings r ON r.movieid = m.movieid AND m.state='watched'
                    GROUP BY m.movieid) a ORDER BY a.suggestedby, a.avg DESC
                """)
    
    highest_movies = cur.fetchall()

    for movie in highest_movies:
        movie['imdbrating'] = round(float(movie['imdbrating']), 2)
        ratings_returned = get_ratings_helper(movie['movieid'])
        movie['filename'] = "/uploads/{}".format(movie['filename'])
        movie['ratings'] = ratings_returned['ratings']
        movie['average'] = ratings_returned['avg']
        del movie['avg']

    cur.execute("""
                SELECT DISTINCT ON (a.suggestedby) a.* FROM (SELECT m.*, AVG(r.rating)
                    FROM movies m JOIN ratings r ON r.movieid = m.movieid AND m.state='watched'
                    GROUP BY m.movieid) a ORDER BY a.suggestedby, a.avg ASC
                """)
    
    lowest_movies = cur.fetchall()
    
    for movie in lowest_movies:
        movie['imdbrating'] = round(float(movie['imdbrating']), 2)
        ratings_returned = get_ratings_helper(movie['movieid'])
        movie['ratings'] = ratings_returned['ratings']
        movie['average'] = ratings_returned['avg']
        movie['filename'] = "/uploads/{}".format(movie['filename'])
        del movie['avg']

    context = {
        "movies" : highest_movies + lowest_movies,
    }

    return flask.jsonify(**context)