import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  async someFunction() {
    const response = await axios.request('http://localhost:5000/doctors', {});

    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/">
            <div>
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
