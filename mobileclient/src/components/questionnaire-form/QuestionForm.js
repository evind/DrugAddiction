import React from "react";
import { Link } from "react-router-dom";
import QuestionCardList from "./QuestionCardList";
import InitialQuestionCard from "./InitialQuestionCard";
import axios from "axios";
import { urls } from "../../Utils";
import "./QuestionCard.css";

const cardStyle = {
  backgroundColor: "white",
  display: "block",
  flexFlow: "row wrap",
  alignItems: "center",
  padding: "5%",
  margin: "10px",
  borderRadius: "15px",
  border: "1px solid white",
  height: "auto",
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      formAnswers: {},
      isFormValid: false,
      hasDrank: false,
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state.formAnswers);

    const data = {
      patient_id: null,
      submitted: Date.now().toString(),
      hasDrank: this.state.hasDrank,
      score: null,
      relapse_risk: null,
      answers: { ...this.state.formAnswers },
    };

    axios
      .post(urls.backendURL + "/submitquestionnaire", data, {
        headers: {
          AUthorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ submitted: true });

    // if (isFormValid) {
    //   axios.post(urls.backendURL + "/submitquestionnaire", data);
    //   this.setState({ submitted: true });
    // } else {
    //   // new function for formAnswers
    //   // finds invalid/empty answers
    //   // then updates entity (e.g. formAnswer: q15)

    //   // can make new obj for presentational
    // }
  };

  getInitialQuestion = (answer) => {
    this.setState({ hasDrank: answer });
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
      //q4: {val, err},
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
      patient_id: 1,
      submitted: Date.now().toString(),
      hasDrank: true,
      score: null,
      relapse_risk: null,
      answers: { ...fakeData },
    };

    console.log("########");
    console.log(data);

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
            <InitialQuestionCard onChangeCallback={this.getInitialQuestion} />
            <QuestionCardList
              debugMode={false}
              onChangeCallback={this.getFormAnswers}
            />
            <div className="questionnaire-button-container">
              <div>
                <button className="submit-button" type="submit">
                  Submit
                </button>
              </div>
              <div>
                <Link to="/patient">
                  <button className="back-button" type="button">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="question-card">
          <div className="submission-successs-container">
            <h2>Submission successful</h2>
            <Link to="/patient">
              <button type="button">Home</button>
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default QuestionForm;
