SET global local_infile = 1;

LOAD DATA LOCAL INFILE 'C:/Users/micha/OneDrive/Documents/cs348/project/movie_directors.csv' 
INTO TABLE movies.movie_director
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;