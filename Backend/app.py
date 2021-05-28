from flask import Flask, request, jsonify
from flask_cors import CORS
from data_utils import *
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt,
    jwt_required,
    get_jwt_identity,
)
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "ejkwlqejqlwk289qe7q9e8eq98qeq9q9"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=20)
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def hello_world():
    return "Running..."


@app.route("/login", methods=["POST"])
def login():
    login_json = request.get_json()

    email = login_json.get("email")
    password = login_json.get("password")

    doctor = get_doctor_by_email(email)

    if doctor == -1:
        return jsonify(msg="error"), 401
    else:
        doctor = doctor[0]

    if check_password_hash(doctor["password"], password) is False:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=doctor["id"])
    refresh_token = create_refresh_token(identity=doctor["id"])
    return jsonify(access_token=access_token, refresh_token=refresh_token)


@app.route("/patientlogin", methods=["POST"])
def patient_login():
    login_json = request.get_json()

    email = login_json.get("email")
    password = login_json.get("password")

    patient = get_patient_by_email(email)

    if patient == -1:
        return jsonify(msg="error"), 401
    else:
        patient = patient[0]

    if check_password_hash(patient["password"], password) is False:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=patient["id"])
    refresh_token = create_refresh_token(identity=patient["id"])
    return jsonify(access_token=access_token, refresh_token=refresh_token)


@app.route("/patientregister", methods=["POST"])
def patient_register():
    formData = request.get_json()
    res = register_patient(formData)
    if res == -1:
        return (
            jsonify(msg="An account is already registered with this email addres"),
            409,
        )
    return res


@app.route("/refresh_token", methods=["GET"])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)


@app.route("/dashboard", methods=["GET"])
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


@app.route("/addpatient", methods=["POST"])
@jwt_required()
def addpatient():
    identity = get_jwt_identity()
    req = request.get_json()

    patient_email = req.get("email")

    response = add_patient(identity, patient_email)

    return response


@app.route("/patientoverview/<int:patient_id>", methods=["GET"])
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


    returnData = jsonify(
        patient_details=patient_details, questionnaire_data=questionnaire_data
    )
    return returnData


@app.route("/get_signup_code", methods=["GET"])
@jwt_required()
def get_signup_code():
    identity = get_jwt_identity()
    code = generate_signup_code(identity)

    return code


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
@jwt_required()
def submit():
    identity = get_jwt_identity()
    submission = request.get_json(force=True)
    submit_questionnaire(submission, identity)
    return "ok"
