import mariadb
import json
from flask import jsonify
from datetime import datetime, timedelta
from secrets import choice


try:
    conn = mariadb.connect(
        user="da_admin",
        password="temporary",
        host="127.0.0.1",
        port=3306,
        database="drug_addiction",
    )
    conn.autocommit = True
except mariadb.Error as e:
    print(f"Error connecting to database: {e}")


def get_all_doctors():
    SQL = "SELECT * FROM doctors"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL)
        data = cursor.fetchall()
    return jsonify(data)


def get_doctor(id):
    SQL = "SELECT * FROM doctors WHERE id=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (id,))
        data = cursor.fetchall()
        print("############")
        print(data)
        print("############")
        if data:
            return data
        else:
            return -1


def get_doctor_by_email(email):
    SQL = "SELECT * FROM doctors WHERE email=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (email,))
        data = cursor.fetchall()
        print("############")
        print(data)
        print("############")
        if data:
            return data
        else:
            return -1


def get_patient_by_email(email):
    SQL = "SELECT * FROM patients WHERE email=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (email,))
        data = cursor.fetchall()
        print("############")
        print(data)
        print("############")
        if data:
            return data
        else:
            return -1


def add_patient(doctor_id, patient_email):
    print(doctor_id)
    # 1. does patient email exist?
    # 2. if yes, is patient assigned to a group?
    # 3. if no, add patient to doctor's group
    SQL = "SELECT doctor_id FROM patients WHERE email=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (patient_email,))
        patient_details = cursor.fetchall()

    if (patient_details):
        patient_group = patient_details[0]["doctor_id"]
        print(doctor_id)
        if (patient_group):
            if (patient_group == doctor_id):
                return jsonify(msg="Patient is already in your group")
            else:
                return jsonify(msg="Patient is a member of another doctor's group")
        else:
            SQL = "UPDATE patients SET doctor_id=? WHERE email=?"
            with conn.cursor(dictionary=True) as cursor:
                cursor.execute(SQL, (doctor_id,patient_email,))
            return jsonify(msg="Success")
    else:
        return jsonify(msg="Cannot find email")


def generate_signup_code(doctor_id):
    timestamp = datetime.now()
    expires = timestamp + timedelta(days=10)

    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    codeA = ''.join([choice(chars) for i in range(4)])
    codeB = ''.join([choice(chars) for i in range(4)])
    code = codeA + "-" + codeB

    data = (doctor_id, code, timestamp, expires)

    SQL = """INSERT INTO signup_codes (doctor_id, code, created, expires)
             VALUES (?, ?, ?, ?)
          """

    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, data)

    return code

def get_patients_by_doctor(id):
    SQL = "SELECT * FROM patients WHERE doctor_id=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (id,))
        data = cursor.fetchall()
        returnData = []

        for i in data:
            returnData.append({
                "id": i["id"],
                "first_name": i["first_name"],
                "last_name": i["last_name"],
                "dob": i["dob"]
            })

        return returnData


def get_all_patients():
    SQL = "SELECT * FROM patients"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL)
        data = cursor.fetchall()
    return jsonify(data)


def get_patient(id):
    SQL = "SELECT * FROM patients WHERE id=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (id,))
        data = cursor.fetchall()
        if data:
            return data
        else:
            return -1


def get_all_questionnaires():
    SQL = "SELECT * FROM questionnaires"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL)
        data = cursor.fetchall()
    return jsonify(data)


def get_patient_questionnaires(patient_id):
    SQL = "SELECT * FROM questionnaires WHERE patient_id=?"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (patient_id,))
        data = cursor.fetchall()
    return data


def get_questionnaire(id):
    SQL1 = "SELECT * FROM questionnaires WHERE id=?"
    SQL2 = "SELECT * FROM patients WHERE id=?"
    output = []

    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL1, (id,))
        data = cursor.fetchall()
        cursor.execute(SQL2, (data[0]["patient_id"],))
        patient_data = cursor.fetchall()

    structured = {
        "id": data[0]["id"],
        "patient_id": data[0]["patient_id"],
        "first_name": patient_data[0]["first_name"],
        "last_name": patient_data[0]["last_name"],
        "submitted": data[0]["submitted"],
        "score": data[0]["score"],
        "relapse_risk": data[0]["relapse_risk"],
        "has_drank": data[0]["has_drank"],
        "results": [],
    }

    for key, val in data[0].items():
        if key not in structured:
            structured["results"].append({"id": key, "result": val})

    with open("./static/questionnaire.json") as infile:
        questionnaire = json.load(infile)

    for i, j in zip(structured["results"], questionnaire):
        output.append({"id": i["id"], "answer": i["result"], "question": j})

    structured["results"] = output

    return jsonify(structured)


def calculate_score(answers):
    score = 0
    reverse = ["q8", "q14", "q20", "q24", "q26"]
    for key, val in answers.items():
        if key in reverse:
            score += 8 - val
        else:
            score += val
    return score


def calculate_relapse_risk(score, has_drank):
    if score >= 28 and score <= 55:
        return 37 if has_drank else 11
    elif score >= 56 and score <= 69:
        return 62 if has_drank else 21
    elif score >= 70 and score <= 83:
        return 72 if has_drank else 24
    elif score >= 84 and score <= 97:
        return 82 if has_drank else 25
    elif score >= 98 and score <= 111:
        return 86 if has_drank else 28
    elif score >= 112 and score <= 125:
        return 77 if has_drank else 37
    elif score >= 126 and score <= 168:
        return 90 if has_drank else 43
    elif score >= 169 and score <= 196:
        return 95 if has_drank else 53


def submit_questionnaire(submission, patient_id):
    submission["patient_id"] = patient_id
    submission["has_drank"] = submission.pop("hasDrank")
    submission["submitted"] = datetime.now()
    submission["score"] = calculate_score(submission["answers"])
    submission["relapse_risk"] = calculate_relapse_risk(
        submission["score"], submission["has_drank"]
    )
    print(submission["has_drank"], type(submission["has_drank"]))

    # Pull values out out of `answers` array and into the root dictionary
    # (for sorting) then delete the `answers` array
    for key, val in submission["answers"].items():
        submission[key] = val
    submission.pop("answers", None)

    buildSQL = "INSERT INTO questionnaires ("

    data = []
    for key, val in sorted(submission.items()):
        buildSQL += f"{key},"
        data.append(val)

    buildSQL = buildSQL.rstrip(",")
    buildSQL += (
        ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    )

    print("##############")
    print(buildSQL)
    print("data: ", data)
    print("##############")

    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(buildSQL, data)
