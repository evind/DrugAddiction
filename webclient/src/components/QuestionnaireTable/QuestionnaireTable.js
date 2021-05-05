import React from "react";
import "./QuestionnaireTable.css";
import TableRowList from "./TableRowList";

class QuestionnaireTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
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
