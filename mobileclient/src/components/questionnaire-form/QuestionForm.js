import React from "react";
import QuestionCardList from "./QuestionCardList";
import axios from "axios";

const urls = {
  backendURL: "http://192.168.0.242:5000",
  webclientURL: "http://192.168.0.242:3000",
  mobileclientURL: "http://192.168.0.242:3001",
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { submitted: false, formAnswers: {} };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state.formAnswers);

    const data = {
      patient_id: 4,
      submitted: Date.now().toString(),
      has_drank: Math.random() < 0.5,
      score: null,
      relapse_risk: null,
      ...this.state.formAnswers,
    };

    axios.post(urls.backendURL + "/submitquestionnaire", data);
    this.setState({ submitted: true });
  };

  getFormAnswers = (data) => {
    console.log(data);
    this.setState({ formAnswers: { ...data } });
  };

  testSubmit = (val) => {
    console.log("TEST SUBMIT");

    const fakeData = {
      q1: val,
      q2: val,
      q3: val,
      q4: val,
      q5: val,
      q6: val,
      q7: val,
      q8: val,
      q9: val,
      q10: val,
      q11: val,
      q12: val,
      q13: val,
      q14: val,
      q15: val,
      q16: val,
      q17: val,
      q18: val,
      q19: val,
      q20: val,
      q21: val,
      q22: val,
      q23: val,
      q24: val,
      q25: val,
      q26: val,
      q27: val,
      q28: val,
    };

    const data = {
      patient_id: 4,
      submitted: Date.now().toString(),
      has_drank: Math.random() < 0.5,
      score: null,
      relapse_risk: null,
      ...fakeData,
    };

    axios.post(urls.backendURL + "/submitquestionnaire", data);
    this.setState({ submitted: true });
  };

  renderContent() {
    if (this.state.submitted === false) {
      return (
        <div>
          <input
            type="button"
            value="Submit 1s"
            onClick={() => {
              this.testSubmit(1);
            }}
          />
          <input
            type="button"
            value="Submit 7s"
            onClick={() => {
              this.testSubmit(7);
            }}
          />
          <form onSubmit={this.onFormSubmit}>
            <QuestionCardList onChangeCallback={this.getFormAnswers} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <div>Submission successful</div>;
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default QuestionForm;
