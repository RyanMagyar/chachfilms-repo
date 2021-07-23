INSERT INTO reviewers(username, fullname, filename, password)
VALUES ('Ryan', 'Ryan Magyar','e1a7c5c32973862ee15173b0259e3efdb6a391af.jpg','sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4');

INSERT INTO reviewers(username, fullname, filename, password)
VALUES ('Marcus', 'Marcus Cook','505083b8b56c97429a728b68f31b0b2a089e5113.jpg','sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4');

INSERT INTO reviewers(username, fullname, filename, password)
VALUES ('Justin', 'Justin Kainz', '5ecde7677b83304132cb2871516ea50032ff7a4f.jpg', 'sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4');

INSERT INTO reviewers(username, fullname, filename, password)
VALUES ('Jon', 'Jonathan Cook','73ab33bd357c3fd42292487b825880958c595655.jpg', 'sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0078748', 'Alien', 1979, 'Ridley Scott', 'Alien1979coverphoto.jpg',ARRAY ['Sci-Fi', 'Horror'], 8.4, 'watched', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0469494', 'There Will Be Blood',  2007 ,  'Paul Thomas Anderson',  'ThereWillBeBlood2007coverphoto.jpg',ARRAY ['Drama'],  8.2, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0033467', 'Citizen Kane', 1941, 'Orson Welles', 'CitizenKane1941coverphoto.jpg',ARRAY ['Drama', 'Mystery'],  8.3, 'watched', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('8367814', 'The Gentlemen', 2019, 'Guy Ritchie', 'TheGentlemen2019coverphoto.jpg',ARRAY ['Action', 'Comedy', 'Crime'],  7.8, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0101410', 'Barton Fink', 1991,  'Joel Coen', 'BartonFink1991coverphoto.jpg',ARRAY ['Comedy', 'Drama', 'Thriller'],  7.7, 'inrotation', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('1560747', 'The Master', 2012, 'Paul Thomas Anderson',  'TheMaster2012coverphoto.jpg', ARRAY ['Drama'],  7.2, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0106677', 'Dazed and Confused', 1993, 'Richard Linklater', 'DazedandConfused1993coverphoto.jpg', ARRAY ['Comedy'], 7.6, 'inrotation', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('10342730', 'Spiral', 2021, 'Darren Lynn Bousman', 'Spiral2021coverphoto.jpg', ARRAY ['Crime', 'Horror', 'Mystery', 'Thriller'], 5.3, 'inrotation', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0093773', 'Predator', 1987, 'John McTiernan', 'Predator1987coverphoto.jpg', ARRAY ['Action', 'Adventure', 'Sci-Fi', 'Thriller'], 7.8, 'inrotation', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0159365', 'Cold Mountain', 2003, 'Anthony Minghella', 'ColdMountain2003coverphoto.jpg', ARRAY ['Adventure', 'Drama', 'History', 'Romance', 'War'], 7.2, 'inrotation', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('12298506', 'Black Box', 2020, 'Emmanuel Osei-Kuffour', 'BlackBox2020coverphoto.jpg', ARRAY ['Horror', 'Mystery', 'Sci-Fi', 'Thriller'], 6.2, 'inrotation', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0109830', 'Forrest Gump', 1994, 'Robert Zemeckis', 'ForrestGump1994coverphoto.jpg', ARRAY ['Drama', 'Romance'], 8.8, 'inrotation', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0105695', 'Unforgiven', 1992, 'Clint Eastwood', 'Unforgiven1992coverphoto.jpg', ARRAY ['Drama', 'Western'], 8.2, 'inrotation', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0111503', 'True Lies', 1994, 'James Cameron', 'TrueLies1994coverphoto.jpg', ARRAY ['Action', 'Comedy', 'Thriller'], 7.2, 'ondeck', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0259711', 'Vanilla Sky', 2001, 'Cameron Crowe', 'VanillaSky2001coverphoto.jpg', ARRAY ['Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'], 6.9, 'ondeck', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0114746', '12 Monkeys', 1995, 'Terry Gilliam', '12Monkeys1995coverphoto.jpg', ARRAY ['Mystery', 'Sci-Fi', 'Thriller'], 8.0, 'ondeck', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0118971', 'The Devil''s Advocate', 1997, 'Taylor Hackford', 'TheDevil''sAdvocate1997coverphoto.jpg', ARRAY ['Drama', 'Mystery', 'Thriller'], 7.5, 'ondeck', 'Jon');

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0078748', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0469494', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0469494', 9);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0469494', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0469494', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0033467', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0033467', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0033467', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0033467', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '8367814', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '8367814', 9);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '8367814', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '8367814', 9.25);