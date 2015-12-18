from flask import Flask
from flask import render_template, abort, jsonify, request,redirect, json
from Classifier import parallelClassifier
app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/learning', methods=['POST'])
def learning():
    data = json.loads(request.data)
    # data == {"userInput": "whatever text you entered"}
    # try 'lucky @USERID ! good luck @USERID & see you soon :) @USERID @USERID'
    response = parallelClassifier(data)
    return jsonify(response)


if __name__ == '__main__':
    app.run(port = 9000)