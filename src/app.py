from flask import Flask
from flask import render_template, abort, jsonify, request,redirect, json
from Classifier import parallelClassifier, initFeatureProcessors
app = Flask(__name__)
app.debug = True

#lexicon_feat, embed_feat = initFeatureProcessors()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/animation')
def animation():
    return render_template('animation.html')

@app.route('/all')
def all():
    return render_template('all.html')    

@app.route('/learning', methods=['POST'])
def learning():
    lexicon_feat, embed_feat = initFeatureProcessors()
    data = json.loads(request.data)
    # try 'lucky @USERID ! good luck @USERID & see you soon :) @USERID @USERID'
    result = parallelClassifier([data], lexicon_feat, embed_feat)
    emotions = result[0]['emotions']
    return jsonify(emotions)


if __name__ == '__main__':
    app.run(host= '0.0.0.0', port = 9000)
