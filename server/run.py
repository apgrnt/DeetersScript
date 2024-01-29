from flask import Flask
from main import *

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/getGames')
def getGames():
    response = callApi()
    return response


if __name__ == '__main__':
    app.run()