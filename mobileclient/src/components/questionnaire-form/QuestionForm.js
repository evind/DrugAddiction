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
      missingAnswers: [],
      renderMissingAnswers: false,
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const data = {
      patient_id: null,
      submitted: Date.now().toString(),
      hasDrank: this.state.hasDrank,
      score: null,
      relapse_risk: null,
      answers: { ...this.state.formAnswers },
    };

    const missingAnswers = this.checkFormAnswers();
    this.setState({ missingAnswers: missingAnswers });

    if (missingAnswers.length === 0) {
      axios
        .post(urls.backendURL + "/submitquestionnaire", data, {
          headers: {
            AUthorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ submitted: true });
    } else {
      this.setState({ renderMissingAnswers: true });
    }
  };

  getInitialQuestion = (answer) => {
    this.setState({ hasDrank: answer });
  };

  getFormAnswers = (data) => {
    this.setState({ formAnswers: { ...data } });
  };

  checkFormAnswers = () => {
    // const formData = this.state.formData;
    const missingAnswers = [];

    for (let i = 1; i < 29; i++) {
      if (!this.state.formAnswers[`q${i}`]) {
        missingAnswers.push(`q${i}`);
      }
    }
    return missingAnswers;
  };

  renderContent() {
    if (this.state.submitted === false) {
      return (
        <div>
          <div className="question-card">
            <h3>
              Please read the following statements and choose the option that
              most accurately represents your experience recently.
            </h3>
          </div>
          <form onSubmit={this.onFormSubmit}>
            <InitialQuestionCard onChangeCallback={this.getInitialQuestion} />
            <QuestionCardList
              debugMode={false}
              onChangeCallback={this.getFormAnswers}
            />
            {this.state.renderMissingAnswers && (
              <div className="question-card">
                <div className="ui error message">
                  <div className="header">
                    Please choose an answer for the following questions:
                  </div>
                  <div>
                    {this.state.missingAnswers.map((answer) => {
                      return <div key={answer}>Q.{answer.split("q")[1]}</div>;
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className="question-card">
              <div>
                <button className="ui primary button" type="submit">
                  Submit
                </button>
              </div>
              <br />
              <div>
                <Link to="/patient">
                  <button className="ui button" type="button">
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
