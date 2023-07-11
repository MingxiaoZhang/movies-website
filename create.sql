CREATE SCHEMA movies;
CREATE TABLE movies.basic_info (
	movie_id INT NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    start_year INT,
    run_time_minutes INT,
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
CREATE TABLE movies.genre (
	genre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(100)
);
CREATE TABLE movies.movie_genre (
	movie_id INT NOT NULL,
    genre_id INT NOT NULL,
	FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id),
    FOREIGN KEY (genre_id) REFERENCES movies.genre(genre_id)
);
CREATE TABLE movies.user (
	user_name VARCHAR(100) NOT NULL PRIMARY KEY,
    user_password VARCHAR(100) NOT NULL
);
CREATE TABLE movies.comment (
    comment_id INT NOT NULL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    movie_id INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES movies.user(user_name),
    FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id)
);

CREATE TABLE movies.every_rate (
	movie_id INT NOT NULL,
    user_name VARCHAR(100),
    rate INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies.basic_info(movie_id),
    FOREIGN KEY (user_name) REFERENCES movies.user(user_name)
);

CREATE TRIGGER movies.get_average
AFTER INSERT ON movies.every_rate
FOR EACH ROW
	UPDATE movies.movie_rating
	SET movies.movie_rating.average_rating = (movies.movie_rating.average_rating*movies.movie_rating.num_votes + NEW.rate) / (movies.movie_rating.num_votes + 1)
		WHERE movies.movie_rating.movie_id = NEW.movie_id;
        
CREATE TRIGGER movies.get_average2
AFTER INSERT ON movies.every_rate
FOR EACH ROW
	UPDATE movies.movie_rating
	SET movies.movie_rating.num_votes = movies.movie_rating.num_votes + 1
    WHERE movies.movie_rating.movie_id = NEW.movie_id;
