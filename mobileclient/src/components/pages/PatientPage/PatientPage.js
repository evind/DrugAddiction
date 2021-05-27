import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./PatientPage.css";

class PatientPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

  handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  renderContent = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    console.log("/patient accessToken: ", accessToken);
    console.log(this.state.data);

    if (accessToken) {
      console.log("yes access token");
      return (
        <div className="patient-page-card">
          <div className="patient-page-btn-con">
            <div>
              <Link to="/questionnaire">
                <button className="patient-page-btn" type="button">
                  Start Questionnaire
                </button>
              </Link>
            </div>
            <div>
              <Link to="/">
                <button
                  className="patient-page-btn"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {
    return <div className="patient-page-container">{this.renderContent()}</div>;
  }
}
export default PatientPage;
