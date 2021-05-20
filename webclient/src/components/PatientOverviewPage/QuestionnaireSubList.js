import React from "react";
import "./QuestionnaireSubList.css";

class QuestionnaireSubList extends React.Component {
  render() {
    return (
      <div className="qs-list-container">
        <div className="qs-list-item">
          <div className="qs-list-item-1">AWARE Form Submission</div>
          <div className="qs-list-item-2">Date</div>
          <div className="qs-list-item-3">AWARE Score</div>
          <div className="qs-list-item-4">Relapse Risk</div>
        </div>
        <div className="qs-list-item">
          <div className="qs-list-item-1">AWARE Form Submission</div>
          <div className="qs-list-item-2">Date</div>
          <div className="qs-list-item-3">AWARE Score</div>
          <div className="qs-list-item-4">Relapse Risk</div>
        </div>
        <div className="qs-list-item">
          <div className="qs-list-item-1">AWARE Form Submission</div>
          <div className="qs-list-item-2">Date</div>
          <div className="qs-list-item-3">AWARE Score</div>
          <div className="qs-list-item-4">Relapse Risk</div>
        </div>
      </div>
    );
  }
}

export default QuestionnaireSubList;
