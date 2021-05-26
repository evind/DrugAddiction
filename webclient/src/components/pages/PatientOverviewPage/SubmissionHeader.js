import React from "react";
import "./QuestionnaireSubmissions.css";
import { addLeadingZero } from "../../../Utils";

class SubmissionHeader extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const dateString = `${date.getFullYear()}-${addLeadingZero(
      date.getMonth() + 1
    )}-${addLeadingZero(date.getDate())}`;
    this.state = { today: dateString };
  }

  render() {
    return (
      <div className="qs-header-container">
        <div className="qs-header-text">Questionnaire Submissions</div>
        <div className="qs-header-dates">
          <div className="qs-header-from-date">
            <label for="dates">From date: </label>
            <input type="date" name="from-date" />
            {/* <select name="dates" id="dates">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select> */}
          </div>
          <div className="qs-header-to-date">
            <label for="dates">To date: </label>
            <input type="date" name="to-date" value={this.state.dateString} />
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionHeader;
