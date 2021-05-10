import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import QuestionForm from "./questionnaire-form/QuestionForm";
import PostTest from "./PostTest";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <QuestionForm />
          </Route>
          <Route exact path="/test" component={PostTest} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
