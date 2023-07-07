# app/main.py

from flask import Flask
from app.api.movies import movies
from app.api.users import users
from flask_cors import CORS
from dotenv import load_dotenv


def create_app():
    flask_app = Flask(__name__)
    cors = CORS(flask_app)

    # Load configuration from .env file
    load_dotenv()
    #flask_app.config.from_envvar('.env')

    # Register API routes
    flask_app.register_blueprint(movies)
    flask_app.register_blueprint(users)

    return flask_app

