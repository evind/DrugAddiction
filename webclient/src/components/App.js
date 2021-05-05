import React from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import QuestionnaireResult from "./QuestionnaireResult";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <div>/</div>
          </Route>
          <Route
            exact
            path="/questionnaires/:id"
            component={QuestionnaireResult}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
