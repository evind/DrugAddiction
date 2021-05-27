import React from "react";
import "./QuestionCard.css";

const radioStyle = {
  lineHeight: "200%",
};

class InitialQuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { answer: false };
  }

  onOptionChange = (event) => {
    this.setState({ answer: event.target.value }, () => {
      this.props.onChangeCallback(this.state.answer);
    });
  };

  render() {
    return (
      <div className="question-card">
        <div>Q. Have you consumed alcohol in the past two months?</div>
        <br />
        <div>
          <div style={radioStyle} onChange={this.onOptionChange}>
            <label>
              <input type="radio" value={1} name="hasDrank" /> Yes
            </label>
            <br />
            <label>
              <input type="radio" value={0} name="hasDrank" /> No
            </label>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default InitialQuestionCard;
