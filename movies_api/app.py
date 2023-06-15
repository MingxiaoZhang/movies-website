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
