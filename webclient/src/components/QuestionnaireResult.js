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
      return "Yes";
    } else {
      return "No";
    }
  }

  componentDidMount = async () => {
    const paramId = this.props.match.params.id;
    const res = await axios
      .get(`http://localhost:5000/questionnaires/${paramId}`)
      .catch((error) => {
        if (error.response) {
          console.log("error.res.data: ", error.res.data);
          console.log("error.res.status: ", error.res.status);
          console.log("error.res.headers: ", error.res.headers);
        } else if (("error.request: ", error.request)) {
          console.log("error.request: ", error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    this.setState({ data: res.data, dataRetrieved: true });
  };

  render() {
    return (
      <div>
        <div className="table-container">
          <table className="ui celled table">
            <tbody>
              <tr>
                <td>Patient</td>
                <td>
                  {this.state.data.first_name} {this.state.data.last_name}
                </td>
              </tr>
              <tr>
                <td>Submitted</td>
                <td>{this.state.data.submitted}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{this.state.data.score}</td>
              </tr>
              <tr>
                <td>Risk of relapse in the next 2 months</td>
                <td>{this.state.data.relapse_risk}</td>
              </tr>
              <tr>
                <td>Drank in the last 2 months</td>
                <td>{this.renderHasDrank()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="question-card-container">
          {this.renderQuestionnaireTable()}
        </div>
      </div>
    );
  }
}

//   render() {
//     return (
//       <div>
//         <div>
//           Patient: {this.state.data.first_name} {this.state.data.last_name}
//         </div>
//         <div>Submitted: {this.state.data.submitted}</div>
//         <div>Score: {this.state.data.score}</div>
//         <div>
//           Relapse of relapse in the next 2 months:{" "}
//           {this.state.data.relapse_risk}%
//         </div>
//         <br />
//         <div>Have you drank in the last 2 months: {this.renderHasDrank()}</div>
//         <br />
//         <div className="question-card-container">
//           {this.renderQuestionnaireTable()}
//         </div>
//       </div>
//     );
//   }
// }

export default QuestionnaireResult;
