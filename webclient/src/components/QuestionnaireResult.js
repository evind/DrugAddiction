import React from "react";
import axios from "axios";
import QuestionnaireTable from "./QuestionnaireTable/QuestionnaireTable";

class QuestionnaireResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dataRetrieved: false, data: {} };
  }

  renderQuestionnaireTable() {
    if (this.state.dataRetrieved) {
      return <QuestionnaireTable data={this.state.data} />;
    } else {
      return <div></div>;
    }
  }

  renderHasDrank() {
    if (this.state.data.has_drank) {
      return "Yes.";
    } else {
      return "No.";
    }
  }

  componentDidMount = async () => {
    const paramId = this.props.match.params.id;
    const res = await axios.get(
      `http://localhost:5000/questionnaires/${paramId}`
    );

    this.setState({ data: res.data, dataRetrieved: true });
  };

  render() {
    return (
      <div>
        <div>
          Patient: {this.state.data.first_name} {this.state.data.last_name}
        </div>
        <div>Submitted: {this.state.data.submitted}</div>
        <div>Score: {this.state.data.score}</div>
        <div>
          Relapse of relapse in the next 2 months:{" "}
          {this.state.data.relapse_risk}%
        </div>
        <br />
        <div>Have you drank in the last 2 months: {this.renderHasDrank()}</div>
        <br />
        <div className="question-card-container">
          {this.renderQuestionnaireTable()}
        </div>
      </div>
    );
  }
}

export default QuestionnaireResult;
