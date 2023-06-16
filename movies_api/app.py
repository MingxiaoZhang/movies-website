import os
from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
load_dotenv('.env')

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

def add_user(name, password):
    try:
        cur = mysql.connection.cursor()
    except Exception as e:

    cur.execute(f'SELECT * FROM user WHERE user_name={name}')
    results = cursor.fetchall()
    row_count = cursor.rowcount
    if row_count == 0:
        return False
    cur.execute(f'INSERT INTO user VALUES (\'{name}\', \'{password}\')')
    results = cursor.fetchall()
    for row in results:
        print(row[0])
    return True

def user_login(name, password):
    cur = mysql.connection.cursor()
    cur.execute(f'SELECT * FROM user WHERE user_name={name} and user_password={password}')
    results = cursor.fetchall()
    row_count = cursor.rowcount
    return row_count == 0

# Route to check database connection
@app.route('/moviedata', methods=['GET'])
def get_movies():
    try:
        # Attempt to connect to the database
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM basic_info LIMIT 24')
        data = cur.fetchall()
        json_data = []
        for row in data:
            json_data.append({'id': row[0], 'title': row[1], 'year': row[2], 'runtime': row[3]})
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


@app.route('/moviedata/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    try:
        # Attempt to connect to the database
        cur = mysql.connection.cursor()
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


if __name__ == '__main__':
    app.run()
