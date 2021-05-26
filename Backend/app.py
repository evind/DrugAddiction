from flask import Flask, request, jsonify
from flask_cors import CORS
from data_utils import *
from flask_jwt_extended import (JWTManager, create_access_token,
                               create_refresh_token, get_jwt,
                               jwt_required, get_jwt_identity)
from datetime import datetime, timedelta

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'ejkwlqejqlwk'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=20)
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def hello_world():
    return "Running..."


"""
Refresh tokens:
    1. Store the expiry time of access token in frontend
    2. Each time you make an API requests, first check if current access token
       is near or already expired
      2a. If yes: refresh it
      2b. Else: send access token
"""
@app.route("/login", methods=['POST'])
def login():
    print("### /login: ")
    login_json = request.get_json()

    email = login_json.get('email')
    password = login_json.get('password')

    doctor = get_doctor_by_email(email)

    if doctor == -1:
        return jsonify(msg="error"), 401
    else:
        doctor = doctor[0]

    if password != doctor["password"]:
        return jsonify({'msg': 'Bad username or password'}), 401

    access_token = create_access_token(identity=doctor["id"])
    refresh_token = create_refresh_token(identity=doctor["id"])
    return jsonify(access_token=access_token, refresh_token=refresh_token)

@app.route("/refresh_token", methods=['GET'])
@jwt_required(refresh=True)
def refresh_token():
    print("### /refresh_token: ", get_jwt_identity)
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


@app.route("/dashboard", methods=['GET'])
@jwt_required()
def dashboard():
    identity = get_jwt_identity()

    doctor = get_doctor(identity)
    if doctor != -1:
        doctor = doctor[0]
    else:
        return jsonify(msg="Cannot find doctor")

    patients_in_group = get_patients_by_doctor(doctor["id"])

    return jsonify(doctor=doctor, patients_in_group=patients_in_group)


@app.route("/patientoverview/<int:patient_id>", methods=['GET'])
@jwt_required()
def patient_overview(patient_id):
    identity = get_jwt_identity()

    # Get patient data
    patient_details = get_patient(patient_id)
    if patient_details != -1:
        patient_details = patient_details[0]
    else:
        return jsonify(msg="Cannot find patient")

    # Return error if patient does not belong to doctor
    if patient_details["doctor_id"] != identity:
        return jsonify(msg="Error: not your patient")

    # Get questionnaire data for this patient
    questionnaire_data = get_patient_questionnaires(patient_id)

    for i in questionnaire_data:
        i["submitted"] = i["submitted"].isoformat()

    returnData = jsonify(
        patient_details=patient_details,
        questionnaire_data=questionnaire_data
    )
    return returnData


@app.route("/patients")
def get_patients():
    data = get_all_patients()
    return data


@app.route("/patients/<int:id>")
def get_a_patient(id):
    data = get_patient(id)
    return data


@app.route("/doctors")
def get_doctors():
    data = get_all_doctors()
    return data


@app.route("/doctors/<int:id>")
def get_a_doctor(id):
    data = get_doctor(id)
    return data


@app.route("/questionnaires")
def get_questionnaires():
    data = get_all_questionnaires()
    return data


@app.route("/questionnaires/<int:id>")
def get_a_questionnaire(id):
    data = get_questionnaire(id)
    return data


@app.route("/submitquestionnaire", methods=["POST"])
def submit():
    if request.method == "POST":
        print("POST")
        submission = request.get_json(force=True)
        submit_questionnaire(submission)
    return "ok"
