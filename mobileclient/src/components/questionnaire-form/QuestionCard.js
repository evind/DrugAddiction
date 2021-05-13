import React from "react";
import RadioGroup from "./RadioGroup";
import "./QuestionCard.css";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getRadioGroupValue = (key, val) => {
    this.props.onChangeCallback(key, val);
  };

  render() {
    return (
      <div className="question-card">
        <div>{this.props.questionText}</div>
        <br />
        <div>
          <RadioGroup
            group={this.props.group}
            onChangeCallback={this.getRadioGroupValue}
          />
        </div>
      </div>
    );
  }
}

export default QuestionCard;
