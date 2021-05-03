import mariadb
import json
from flask import jsonify


try:
    conn = mariadb.connect(
        user="da_admin",
        password="temporary",
        host="127.0.0.1",
        port=3306,
        database="drug_addiction"
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
    return jsonify(data)


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
    return jsonify(data)


def get_all_questionnaires():
    SQL = "SELECT * FROM questionnaires"
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL)
        data = cursor.fetchall()
    return jsonify(data)


def get_questionnaire(id):
    SQL = "SELECT * FROM questionnaires WHERE id=?"
    output = []

    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (id,))
        data = cursor.fetchall()

    structured = {
        "id": data[0]["id"],
        "patient_id": data[0]["patient_id"],
        "submitted": data[0]["submitted"],
        "score": data[0]["score"],
        "relapse_risk": data[0]["relapse_risk"],
        "has_drank": data[0]["has_drank"],
        "results": []
    }

    for key, val in data[0].items():
        if key not in structured:
            structured["results"].append({
                "id": key,
                "result": val
            })

    with open("./static/questionnaire.json") as infile:
        questionnaire = json.load(infile)

    for i, j in zip(structured["results"], questionnaire):
        output.append({"id": i["id"], "answer": i["result"], "question": j})

    structured["results"] = output

    return jsonify(structured)
