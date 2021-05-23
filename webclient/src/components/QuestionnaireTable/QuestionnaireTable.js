import React from "react";
import TableRowList from "./TableRowList";
import "./QuestionnaireTable.css";

class QuestionnaireTable extends React.Component {
  render() {
    return (
      <div className="table-container">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Never</th>
              <th>Rarely</th>
              <th>Sometimes</th>
              <th>Fairly Often</th>
              <th>Often</th>
              <th>Almost Always</th>
              <th>Always</th>
            </tr>
          </thead>
          <tbody>
            <TableRowList results={this.props.data.results} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default QuestionnaireTable;
