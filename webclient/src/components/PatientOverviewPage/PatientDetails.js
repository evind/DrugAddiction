import React from "react";
import "./PatientDetails.css";

class PatientDetails extends React.Component {
  render() {
    return (
      <div className="patient-details-container">
        <div className="patient-details-header">Patient Details</div>
        <div className="patient-details-body">
          <table>
            <tbody>
              <tr>
                <td>Patient: </td>
                <td>Jane Doe</td>
              </tr>
              <tr>
                <td>Phone #:</td>
                <td>562-831-2977</td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>61 Copeland Island, Ericaland, Hawaii,</td>
              </tr>
              <br />
              <tr>
                <td>Check-in:</td>
                <td>Weekly</td>
              </tr>
              <tr>
                <td>Last check-in:</td>
                <td>10/05/2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PatientDetails;
