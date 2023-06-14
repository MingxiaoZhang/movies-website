CREATE SCHEMA movies;
CREATE TABLE movies.basic_info (
	movie_id INT NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    start_year INT,
    run_time_minutes INT,
    genres VARCHAR(255),
    is_adult TINYINT(1)
);
CREATE TABLE movies.person_info (
	person_id INT NOT NULL PRIMARY KEY,
    primary_name VARCHAR(100),
    birth_year INT,
    death_year INT,
    primary_profession VARCHAR(100),
    known_for_titles VARCHAR(100)
);
CREATE TABLE movies.movie_rating (
	movie_id INT NOT NULL,
    average_rating DECIMAL(3, 1),
    num_votes INT,
    FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id)
);
CREATE TABLE movies.movie_director (
	movie_id INT NOT NULL,
    person_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id),
    FOREIGN KEY (person_id) REFERENCES movies.person_info(person_id)
);
CREATE TABLE movies.movie_actor (
	movie_id INT NOT NULL,
    person_id INT NOT NULL,
    characters_played VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id),
    FOREIGN KEY (person_id) REFERENCES movies.person_info(person_id)
);
CREATE TABLE movies.genres (
	genre_id INT NOT NULL PRIMARY KEY,
    genre_name VARCHAR(100)
);
CREATE TABLE movies.movie_genres (
	movie_id INT NOT NULL,
    genre_id INT NOT NULL,
	FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id),
    FOREIGN KEY (genre_id) REFERENCES movies.genres(person_id)
);