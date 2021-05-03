import mariadb
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
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(SQL, (id,))
        data = cursor.fetchall()
    return jsonify(data)
