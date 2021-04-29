import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
                <Route exact path="/">
                    <div>Hello, world~</div>
                </Route>
                <Route exact path="/test">
                    <div>test</div>
                </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
