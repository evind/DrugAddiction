import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import PatientPage from "./pages/PatientPage/PatientPage";
import QuestionForm from "./questionnaire-form/QuestionForm";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import "../static/app.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/patient" component={PatientPage} />
          <Route exact path="/questionnaire" component={QuestionForm} />
          <Route exact path="/signup" component={SignUpPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
