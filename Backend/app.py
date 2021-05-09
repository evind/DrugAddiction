from flask import Flask, request, jsonify
from flask_cors import CORS
from data_utils import *

app = Flask(__name__)
#cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
#cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

@app.route('/')
def hello_world():
    return 'Running...'


@app.route('/patients')
def get_patients():
    data = get_all_patients()
    return data


@app.route('/patients/<int:id>')
def get_a_patient(id):
    data = get_patient(id)
    return data


@app.route('/doctors')
def get_doctors():
    data = get_all_doctors()
    return data


@app.route('/doctors/<int:id>')
def get_a_doctor(id):
    data = get_doctor(id)
    return data


@app.route('/questionnaires')
def get_questionnaires():
    data = get_all_questionnaires()
    return data


@app.route('/questionnaires/<int:id>')
def get_a_questionnaire(id):
    data = get_questionnaire(id)
    return data


@app.route('/submitquestionnaire', methods=['POST'])
def submit():
    if request.method == 'POST':
        submission = request.get_json(force=True)
        submit_questionnaire(submission)
    return "ok"
