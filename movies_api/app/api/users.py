# app/api/movies.py

from flask import Blueprint, jsonify, request
from app.db import get_db_connection

users = Blueprint('users', __name__)


@users.route('/create_user', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data['name']
    password = data['password']
    try:
        connection = get_db_connection()
        cur = connection.cursor()
        cur.execute('SELECT * FROM user WHERE user_name=%s', [name])
        results = cur.fetchall()
        row_count = cur.rowcount
        if row_count != 0:
            return jsonify({'status': 500, 'message': 'User already exists'})
        cur.execute('INSERT INTO user VALUES (%s, %s)', (name, password))
        connection.commit()

        # test
        cur.execute('SELECT * FROM user')
        results = cur.fetchall()
        for row in results:
            print(row[0])
        return jsonify({'status': 200})
    except Exception as e:
        print(e)
        return jsonify({'status': 500, 'message': e})


@users.route('/user_login/<name>/<password>', methods=['GET'])
def user_login(name, password):
    try:
        connect = get_db_connection()
        cur = connect.cursor()
        cur.execute('SELECT user_password FROM user WHERE user_name=%s', [name])
        data = cur.fetchone()
        row_count = cur.rowcount
        if row_count == 0:
            return 'Error: user does not exist'
        elif data[0] == password:
            return 'Login success'
        else:
            return 'Error: Incorrect password'
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'
