# DrugAddiction

### Database setup instructions
Requires MariaDB installed and configured on a Linux system.

Log into MariaDB server:
`sudo mysql -u root -p`

Create database:
`create database drug_addiction;`

Create admin
`grant all on drug_addiction.* to 'da_admin'@'localhost' identified by 'temporary';`

Exit the server, then log in as with new admin account
`quit`, `mysql -u da_admin -p drug_addiction;`

Create doctors table:
```
create table doctors (
     id int not null auto_increment primary key,
     first_name varchar(64),
     last_name varchar(64),
     gender varchar(20),
     email varchar(100),
     password varchar(100),
     dob date,
     address varchar(128),
     city varchar(64),
     region varchar(64),
     country varchar(64),
     postcode varchar(10),
     phone varchar(32),
     created datetime);
```

Create patients table:
```
create table patients (
     id int not null auto_increment primary key,
     doctor_id int,
     first_name varchar(64),
     last_name varchar(64),
     gender varchar(20),
     email varchar(100),
     password varchar(100),
     dob date,
     address varchar(128),
     city varchar(64),
     region varchar(64),
     country varchar(64),
     postcode varchar(10),
     phone varchar(32),
     created datetime);
```

Setup table to hold questionnaire data:
```
create table questionnaires(
     id int not null auto_increment primary key,
     patient_id int,
     submitted datetime,
     score int,
     relapse_risk int,
     has_drank bool,
     q1 tinyint,
     q2 tinyint,
     q3 tinyint,
     q4 tinyint,
     q5 tinyint,
     q6 tinyint,
     q7 tinyint,
     q8 tinyint,
     q9 tinyint,
     q10 tinyint,
     q11 tinyint,
     q12 tinyint,
     q13 tinyint,
     q14 tinyint,
     q15 tinyint,
     q16 tinyint,
     q17 tinyint,
     q18 tinyint,
     q19 tinyint,
     q20 tinyint,
     q21 tinyint,
     q22 tinyint,
     q23 tinyint,
     q24 tinyint,
     q25 tinyint,
     q26 tinyint,
     q27 tinyint,
     q28 tinyint);
```
Setup table for the generation of signup codes:
```
create table signup_codes (
    id int not null auto_increment primary key,
    doctor_id int,
    code varchar(32),
    created datetime,
    expires datetime);
```
