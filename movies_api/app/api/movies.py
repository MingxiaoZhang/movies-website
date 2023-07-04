# app/api/movies.py

from flask import Blueprint, jsonify, request
from app.db import get_db_connection

movies = Blueprint('movies', __name__)


@movies.route('/movies-default/<int:num>', methods=['GET'])
def get_movies(num):
    try:
        # Attempt to connect to the database
        connect = get_db_connection()
        cur = connect.cursor()
        cur.execute('SELECT * FROM basic_info LIMIT %s', [num])
        data = cur.fetchall()
        json_data = []
        for row in data:
            json_data.append({'id': row[0], 'title': row[1], 'year': row[2], 'runtime': row[3]})
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


@movies.route('/movie-data/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    try:
        # Attempt to connect to the database
        connect = get_db_connection()
        cur = connect.cursor()
        cur.execute('SELECT * FROM basic_info WHERE movie_id=%s', [movie_id])
        data = cur.fetchone()
        cur.execute('SELECT * FROM movie_rating WHERE movie_id=%s', [movie_id])
        rating_data = cur.fetchone()
        cur.execute('SELECT * FROM person_info WHERE person_id IN (SELECT person_id FROM movie_director WHERE '
                    'movie_id=%s)', [movie_id])
        director_data = cur.fetchone()
        cur.execute('SELECT genre_name FROM genre WHERE genre_id IN (SELECT genre_id FROM movie_genre WHERE '
                    'movie_id=%s)', [movie_id])
        genre_data = cur.fetchall()
        genre_data = [item[0] for item in genre_data]
        json_data = {
            'title': data[1],
            'year': data[2],
            'runtime': data[3],
            'rating': rating_data[1],
            'director': director_data[1],
            'genres': genre_data
        }
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


@movies.route('/search-movie/<search_info>', methods=['GET'])
def search_movie(search_info):
    try:
        connect = get_db_connection()
        cur = connect.cursor()
        cur.execute('SELECT movie_id, title, start_year, run_time_minutes, is_adult FROM basic_info WHERE title LIKE \'%' + search_info + '%\' LIMIT 20')
        data = cur.fetchall()
        json_data = []
        for row in data:
            json_data.append({'id': row[0], 'title': row[1], 'year': row[2], 'runtime': row[3]})
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


@movies.route('/search-name/<search_info>', methods=['GET'])
def search_name(search_info):
    try:
        connect = get_db_connection()
        cur = connect.cursor()
        cur.execute('SELECT person_id,primary_name, birth_year, death_year, primary_profession, known_for_titles'
                    ' FROM person_info WHERE primary_name=%s', [search_info])
        data = cur.fetchone()
        json_data = {'person_id': data[0], 'primary_name': data[1], 'birth_year': data[2],
                     'death_year': data[3], 'primary_profession': data[4], 'known_for_titles': data[5]}
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


@movies.route('/movies', methods=['GET'])
def get_sorted_movies():
    try:
        connect = get_db_connection()
        cur = connect.cursor()
        sort_type = request.args.get('type')
        is_asc = request.args.get('isAsc')
        order_type = 'DESC'
        if is_asc == 'true':
            order_type = 'ASC'
        if sort_type == 'RATING':
            cur.execute(
                'SELECT movie_id, title, start_year, run_time_minutes, is_adult FROM basic_info NATURAL JOIN '
                'movie_rating ORDER BY average_rating ' + order_type)
        elif sort_type == 'TITLE':
            cur.execute('SELECT * FROM basic_info ORDER BY title ' + order_type)
        elif sort_type == 'YEAR':
            cur.execute('SELECT * FROM basic_info ORDER BY start_year ' + order_type)
        else:
            cur.execute('SELECT * FROM basic_info')
        data = cur.fetchall()
        json_data = []
        for row in data:
            json_data.append({'id': row[0], 'title': row[1], 'year': row[2], 'runtime': row[3]})
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'
