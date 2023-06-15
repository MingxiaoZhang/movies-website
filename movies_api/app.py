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
        cur.execute('SELECT * FROM basics LIMIT 10')
        data = cur.fetchall()
        json_data = []
        for row in data:
            json_data.append({'title': row[1], 'year': row[2], 'genre': row[4]})
        print(json_data)
        return jsonify(json_data)
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'


if __name__ == '__main__':
    app.run()
