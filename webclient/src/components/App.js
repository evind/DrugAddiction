import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import PatientOverviewPage from "./pages/PatientOverviewPage/PatientOverviewPage";
import QuestionnaireResult from "./QuestionnaireResult";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/LoginPage";
import AddPatientForm from "./pages/AddPatientPage/AddPatientForm";
import "./App.css";

class App extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Link to="/">
            <button onClick={this.handleLogout}>Logout</button>
          </Link>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route
            exact
            path="/questionnaires/:id"
            component={QuestionnaireResult}
          />
          <Route
            exact
            path="/patientoverview/:id"
            component={PatientOverviewPage}
          ></Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/addpatient">
            <AddPatientForm />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
