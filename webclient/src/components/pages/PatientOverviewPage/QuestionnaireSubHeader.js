import React from "react";
import "./QuestionnaireSubmission.css";

class QuestionnaireSubHeader extends React.Component {
  render() {
    return (
      <div className="qs-header-container">
        <div className="qs-header-text">Questionnaire Submissions</div>
        <div className="qs-header-dates">
          <div className="qs-header-from-date">
            <label for="cars">From date: </label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="qs-header-to-date">
            <label>To date: </label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionnaireSubHeader;
