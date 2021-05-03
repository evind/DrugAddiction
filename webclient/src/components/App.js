import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import QuestionnaireResult from './QuestionnaireResult';

class App extends React.Component {

  async someFunction() {
    const response = await axios.get('http://localhost:5000/doctors');

    console.log(response.data);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <div>
              <QuestionnaireResult questionnaireId="4" />
              <input type="button" value="click" onClick={this.someFunction} />
            </div>
          </Route>
          <Route exact path="/test">
            <div>test</div>
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
