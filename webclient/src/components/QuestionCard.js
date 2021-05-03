import React from 'react';
import './QuestionCard.css';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question-card">
        <table>
          <tbody>
            <tr>
              <th colSpan="100%">{this.props.qNum}. {this.props.qText}</th>
            </tr>
            <tr>
              <td>Never</td>
              <td>Rarely</td>
              <td>Sometimes</td>
              <td>Fairly Often</td>
              <td>Often</td>
              <td>Almost Always</td>
              <td>Always</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td value="3"/>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
        <br/>
      </div>
    );
  }
}

export default QuestionCard;
