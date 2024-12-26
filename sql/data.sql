INSERT INTO reviewers(username, fullname, filename, password, bio)
VALUES ('Ryan', 'Ryan Magyar','e1a7c5c32973862ee15173b0259e3efdb6a391af.jpg','sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4', '');

INSERT INTO reviewers(username, fullname, filename, password, bio)
VALUES ('Marcus', 'Marcus Cook','505083b8b56c97429a728b68f31b0b2a089e5113.jpg','sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4', '');

INSERT INTO reviewers(username, fullname, filename, password, bio)
VALUES ('Justin', 'Justin Kainz', '5ecde7677b83304132cb2871516ea50032ff7a4f.jpg', 'sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4', '');

INSERT INTO reviewers(username, fullname, filename, password, bio)
VALUES ('Jon', 'Jonathan Cook','73ab33bd357c3fd42292487b825880958c595655.jpg', 'sha512$0829205c90664b8dba60b23771f4079f$e3508d265367aca357863a4ecc0fb53ecc6bccf40b2a9ca891c749799064bdf9bb7b8b13601c89a03c92cc8e09adbc2336797a1cd0471b901121acf1eaa038f4', '');

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

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0106977', 'The Fugitive', 1993, 'Andrew Davis', 'TheFugitive1993coverphoto.jpg', ARRAY ['Action', 'Crime', 'Drama', 'Mystery', 'Thriller'], 7.8, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0120586', 'American History X', 1998, 'Tony Kaye', 'AmericanHistoryX1998coverphoto.jpg', ARRAY ['Drama'], 8.5, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('1631867', 'Edge of Tomorrow', 2014, 'Doug Liman', 'EdgeofTomorrow2014coverphoto.jpg', ARRAY ['Action', 'Adventure', 'Sci-Fi'], 7.9, 'watched', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0104348', 'Glengarry Glen Ross', 1992, 'James Foley', 'GlengarryGlenRoss1992coverphoto.jpg', ARRAY ['Crime', 'Drama', 'Mystery'], 7.7, 'watched', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('1800241', 'American Hustle', 2013, 'David O. Russell', 'AmericanHustle2013coverphoto.jpg', ARRAY ['Crime', 'Drama'], 7.2, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('1234548', 'The Men Who Stare at Goats', 2009, 'Grant Heslov', 'TheMenWhoStareatGoats2009coverphoto.jpg', ARRAY ['Comedy', 'War'], 6.2, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('2316411', 'Enemy', 2013, 'Denis Villeneuve', 'Enemy2013coverphoto.jpg', ARRAY ['Drama', 'Mystery', 'Thriller'], 6.9, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('5109784', 'Mother!', 2017, 'Darren Aronofsky', 'Mother!2017coverphoto.jpg', ARRAY ['Drama', 'Horror', 'Mystery'], 6.6, 'watched', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0368008', 'The Manchurian Candidate', 2004, 'Jonathan Demme', 'TheManchurianCandidate2004coverphoto.jpg', ARRAY ['Drama', 'Mystery', 'Sci-Fi', 'Thriller'], 6.6, 'watched', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0120735', 'Lock, Stock and Two Smoking Barrels', 1998, 'Guy Ritchie', 'Lock,StockandTwoSmokingBarrels1998coverphoto.jpg', ARRAY ['Action', 'Comedy', 'Crime'], 8.1, 'watched', 'Justin');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0120689', 'The Green Mile', 1999, 'Frank Darabont', 'TheGreenMile1999coverphoto.jpg', ARRAY ['Crime', 'Drama', 'Fantasy', 'Mystery'], 8.6, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0088247', 'The Terminator', 1984, 'James Cameron', 'TheTerminator1984coverphoto.jpg', ARRAY ['Action', 'Adventure', 'Sci-Fi'], 8.1, 'watched', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0103064', 'Terminator 2: Judgment Day', 1991, 'James Cameron', 'Terminator2:JudgmentDay1991coverphoto.jpg', ARRAY ['Action', 'Adventure', 'Sci-Fi'], 8.6, 'watched', 'Ryan');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0120815', 'Saving Private Ryan', 1998, 'Steven Spielberg', 'SavingPrivateRyan1998coverphoto.jpg', ARRAY ['Drama', 'War'], 8.6, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0317248', 'City of God', 2002, 'Fernando Meirelles', 'CityofGod2002coverphoto.jpg', ARRAY ['Crime', 'Drama'], 8.6, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0116282', 'Fargo', 1996, 'Joel Coen', 'Fargo1996coverphoto.jpg', ARRAY ['Crime', 'Thriller'], 8.1, 'watched', 'Marcus');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('5442430', 'Life', 2017, 'Daniel Espinosa', 'Life2017coverphoto.jpg', ARRAY ['Horror', 'Sci-Fi', 'Thriller'], 6.6, 'watched', 'Jon');

INSERT INTO movies(movieid, title, year, director, filename, genres, imdbrating, state, suggestedby)
VALUES ('0117951', 'Trainspotting', 1996, 'Danny Boyle', 'Trainspotting1996coverphoto.jpg', ARRAY ['Drama'], 8.1, 'watched', 'Ryan');

INSERT INTO comments(owner, movieid, text)
VALUES ('Ryan', '0118971', 'This movie sucks!');

INSERT INTO comments(owner, movieid, text)
VALUES ('Jon', '0118971', 'I love this movie.');

INSERT INTO comments(owner, movieid, text)
VALUES ('Justin', '0118971', 'This movie was fantastic. I really liked Keanu Reeves, but Al Pacino was a bit of a bore. Overall it was good.');

INSERT INTO comments(owner, movieid, text)
VALUES ('Marcus', '0118971', 'Jon you need to pick better movies.');

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0104348', 7.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0104348', 6.66);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0104348', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0104348', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '1631867', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '1631867', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '1631867', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '1631867', 9.27);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0120586', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0120586', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0120586', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0120586', 6.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0106977', 8.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0106977', 8.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0106977', 8.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0106977', 9);

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

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '1800241', 8.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '1800241', 7.75);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '1800241', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '1800241', 8.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '1234548', 6);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '1234548', 6);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '1234548', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '1234548', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '2316411', 6.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '2316411', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '2316411', 6);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '2316411', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '5109784', 5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '5109784', 4);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '5109784', 5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '5109784', 6.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0368008', 9);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0368008', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0368008', 9);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0368008', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0120735', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0120735', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0120735', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0120735', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0120689', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0120689', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0120689', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0120689', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0088247', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0088247', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0088247', 7.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0088247', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0103064', 8.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0103064', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0103064', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0103064', 8.1);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0120815', 8.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0120815', 9);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0120815', 8.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0120815', 8.3);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0078748', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0078748', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0317248', 8);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0317248', 7);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0317248', 7.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0317248', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0116282', 7.25);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0116282', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0116282', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0116282', NULL);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '5442430', 6.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '5442430', 7.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '5442430', 6);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '5442430', 8.5);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Ryan', '0117951', 6.75);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Justin', '0117951', 4);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Marcus', '0117951', 6);

INSERT INTO ratings(reviewer, movieid, rating)
VALUES ('Jon', '0117951', NULL);

