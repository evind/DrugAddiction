import React from "react";
import PatientDetails from "./PatientDetails";
import QuestionnaireSubmission from "./QuestionnaireSubmission";
import "./PatientOverviewPage.css";

class PatientOverviewPage extends React.Component {
  render() {
    return (
      <div className="patient-overview-container">
        <PatientDetails />
        <br />
        <br />
        <QuestionnaireSubmission />
      </div>
    );
  }
}

export default PatientOverviewPage;
