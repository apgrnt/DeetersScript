from flask import Flask

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/getGames')
def getGames():
    return app.send_static_file('exampleApiResponse.json')


if __name__ == '__main__':
    app.run()