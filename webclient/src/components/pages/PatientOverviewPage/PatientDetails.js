import React from "react";
import "./PatientDetails.css";

class PatientDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const patientDetails = this.props.patientDetails;
    console.log("patient details: ", patientDetails);
    return (
      <div className="patient-details-container">
        <div className="patient-details-header">Patient Details</div>
        <div className="patient-details-body">
          <table>
            <tbody>
              <tr>
                <td>Patient: </td>
                <td>
                  {patientDetails.first_name} {patientDetails.last_name}
                </td>
              </tr>
              <tr>
                <td>DOB: </td>
                <td>{patientDetails.dob}</td>
              </tr>
              <tr>
                <td>Phone #:</td>
                <td>{patientDetails.phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{patientDetails.email}</td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>{patientDetails.address}</td>
              </tr>
              <br />
              <tr>
                <td>Check-in:</td>
                <td>Weekly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PatientDetails;
