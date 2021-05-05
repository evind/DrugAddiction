import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import QuestionnaireForm from './questionnaire-form/QuestionnaireForm';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={QuestionnaireForm} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
