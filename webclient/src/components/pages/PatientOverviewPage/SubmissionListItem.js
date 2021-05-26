import React from "react";
import { Link } from "react-router-dom";
import "./SubmissionList.css";

class SubmissionListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dataRetrieved: false, data: {} };
  }

  render() {
    return (
      <Link to={`/questionnaires/${this.props.qId}`}>
        <button className="qs-list-item" type="button">
          <div className="qs-list-item-1">AWARE Form Submission</div>
          <div className="qs-list-item-2">Date: {this.props.date}</div>
          <div className="qs-list-item-3">AWARE Score: {this.props.score}</div>
          <div className="qs-list-item-4">
            Relapse Risk: {this.props.relapseRisk}%
          </div>
        </button>
      </Link>
    );
  }
}

export default SubmissionListItem;
