from imdb import IMDb
import requests
import shutil
import os
import chachapp
import pathlib
ia = IMDb()

movies = ia.search_movie('The Devil\'s Advocate')

movie = movies[0]
#print(movies)
#movie = ia.get_movie('0093773')

print(movie['title'])
print(movie['year'])
print(movie.movieID)

movie = ia.get_movie(movie.movieID)

director = movie['directors'][0]
print(director['name'])

print('Genres:')
for genre in movie['genres']:
    print(genre)

print('URL:')
print(movie['full-size cover url'])
print(movie['rating'])

filename = movie['title'].replace(' ', '') + str(movie['year']) + 'coverphoto.jpg'
url = movie['full-size cover url']

response = requests.get(url, stream=True)
path = pathlib.Path(os.getcwd())/'sql'/'uploads'/filename


if response.status_code == 200:
    with open (path, 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)

print('INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)')
print('VALUES (\'', movie.movieID, '\', \'',  movie['title'], '\', ', movie['year'], ', \'', director['name'], '\', \'', filename, '\', ARRAY ', movie['genres'], ', ', movie['rating'], ', \'ondeck\'', ');', sep='')