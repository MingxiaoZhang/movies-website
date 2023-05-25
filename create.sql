CREATE SCHEMA imdb_web;
CREATE TABLE imdb_web.WorkInfo (
	wid INT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL
);
CREATE TABLE imdb_web.Ratings (
	wid INT NOT NULL,
    rating DECIMAL(3, 1),
    num_participants INT DEFAULT 0
)
