# Chachfilms Interactive Movie Review Site

The inspiration for this project came from selecting, watching, and reviewing movies with a group of friends. We eventually formulated a system for selecting movies and then reviewing and keeping track of our scores. We started using a spreadsheet to track movies we watched and the ratings we gave them, but I eventually decided that this would make for a great interactive website and got to work.

# How It Works:

This site was made for a group of friends and I to choose, track, and rate movies that we watched together. 

## Homepage:

The header of the site includes a navigations menu to access various other pages on the site. Some pages such as the "Add New Movie" page are only accessible when logged in. I have included a test user login below that can be used to see and test the full features of the site. 

Test Username: Ryan

Test Password: chach2021

### Choosing a Movie

Below the header is the "Roll" section which is how we decide what movie to watch. My friends and I would often waste time trying to decide what movie we wanted to watch so we devised a system and set of rules to speed up the selection process. Each person can have up to two movies "in rotation" which allows them to be selected on each roll. The person who had their movie chosen last cannot have their movie chosen again back-to-back, which is why the site asks who picked last. The roll button will randomly select a movie from the set of movies that are in rotation and not added by the person who picked last.

### Users' Added Movies

Below the "Roll" section are the movies users have added to the site. They are grouped based on their "state" as either "In Rotation", "On Deck", or "Watched"; movies in the watched state are moved to a seperated watched page. As explained above movies in rotation are eligible to be rolled, while the "on deck" section allows users to save movies they may potentially want to put in rotation. When logged in, users can manage the state of their movies using the buttons found on the bottom of the movie cards. There is also a rating button for adding a rating to the movies. My friends or I would often fall asleep during each others movies which we found funny, so there is also a "slept" option for rating which adds a null score for that user on the movie.

## Add New Movies

Logged in users can add new movies on the "Add New Movie" page. The search uses the themovedb.org API to return search results and information about the movie.

## Statistics

The statistics page uses the Recharts library to display interesting stats related to users' movie selections and ratings. At the bottom of the page is also a section for users' highest and lowest rated movies.

# How It's Made:

**Tech Used:** ReactJs, Jsx, CSS, Python, Flask, PostgreSQL, Docker

### Front end:

The front end is built with ReactJs using Material UI and custom components. Movie cards are displayed in different sections based on their current state which is retrieved from the database through my API. When logged in to an account, users can interact with movie cards to rate movies and change their state as well as edit details about their profile. Logged in users can also access the add new movie page, which uses themoviedb.org API, to search and add new movies. There is also a statistics page available to all users which uses the Recharts library to display interesting statistics related to movies that have been watched and their ratings.

### Back end:

The back end is built using Flask web application framework. The API for this application contains over 20 endpoints to handle user logins, database interactions, and access extrernal APIs. Protected API endpoints are secured using JWT. Movie info is pulled from a PostgreSQL database using Psycopg2 database adapter. Endpoints for searching and adding movies uses themoviedb.org API which allowed me to add relevant info for movies such as their genres, director, poster, IMDB rating and date of release. The statistics API creates interesting statistics relating to users and their movie picks and rating habits by using complex SQL queires. The entire application is containerized and uses seperate Docker containers for the database and web application. Docker was used to simplify development and allow for easier cross platform deployment as I developed mostly on MacOS while the application is hosted on a server running Ubuntu.

