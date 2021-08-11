CREATE TABLE movies(
  movieid VARCHAR(10) NOT NULL,
  title VARCHAR(64) NOT NULL,
  year INTEGER NOT NULL,
  director VARCHAR(40) NOT NULL,
  filename VARCHAR(128) NOT NULL,
  genres VARCHAR(20)[] NOT NULL,
  imdbrating NUMERIC(2,1) NOT NULL,
  state VARCHAR(10) NOT NULL,
  suggestedby VARCHAR(10) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(movieid) 
);

CREATE TABLE reviewers(
  username VARCHAR(20) NOT NULL,
  fullname VARCHAR(40) NOT NULL,
  filename VARCHAR(128) NOT NULL,
  password CHARACTER(256) NOT NULL,
  bio VARCHAR(256),
  PRIMARY KEY(username)
);

CREATE TABLE ratings(
  reviewer VARCHAR(20) NOT NULL,
  movieid VARCHAR(10) NOT NULL,
  rating NUMERIC(4,2),
  FOREIGN KEY(reviewer) REFERENCES reviewers(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(movieid) REFERENCES movies(movieid) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(reviewer, movieid)
)