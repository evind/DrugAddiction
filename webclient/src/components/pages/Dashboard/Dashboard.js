import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

  requestData = () => {
    axios
      .get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("response: ", res);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.status === 401) {
          console.log("expired token");
          axios
            .get("http://localhost:5000/refresh_token", {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "refreshToken"
                )}`,
              },
            })
            .then((res) => {
              window.localStorage.setItem("accessToken", res.data.access_token);
            })
            .catch((err) => {
              console.log("refresh err: ", err);
            });
        } else {
          console.log("heyyyy");
        }
      });
  };

  componentDidMount = () => {
    this.requestData();
  };

  generatePatientList = () => {
    console.log("generatePatientsList(): ");
    const date1 = new Date(this.state.data.patients_in_group[0].dob);
    console.log(date1);
    const patients = this.state.data.patients_in_group.map((patient) => (
      <li key={patient.id}>
        <Link to={`/patientoverview/${patient.id}`}>
          {patient.id} {patient.first_name} {patient.last_name}{" "}
          {new Date(patient.dob).toLocaleDateString()}
        </Link>
      </li>
    ));
    return patients;
  };

  handleAddPatient = () => {
    document.getElementById("add-patient-form-container").style.display =
      "block";
  };

  renderContent = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    console.log("/dashboard accessToken: ", accessToken);
    console.log(this.state.data);

    if (accessToken) {
      console.log("yes access token");
      if (this.state.data.patients_in_group) {
        console.log("yes patients_in_group");
        console.log(this.generatePatientList);
        return (
          <div>
            <ul>{this.generatePatientList()}</ul>
          </div>
        );
      } else {
        return <div>no patients</div>;
      }
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderContent()}
        <div>
          <Link to="/dashboard/addpatient">
            <button type="text">Add Patient</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
