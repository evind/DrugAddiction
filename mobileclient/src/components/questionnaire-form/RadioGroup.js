import React from "react";

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { answer: null };
  }

  onOptionChange = (event) => {
    this.setState({ answer: event.target.value }, () => {
      this.props.onChangeCallback(this.props.group, this.state.answer);
      console.log("QuestionCard.onOptionChange()");
      console.log(this.props.group, ":", this.state.answer);
    });
  };

  render() {
    return (
      <div onChange={this.onOptionChange}>
        <label>
          <input type="radio" value={1} name={this.props.group} /> Never
        </label>
        <br />
        <label>
          <input type="radio" value={2} name={this.props.group} /> Rarely
        </label>
        <br />
        <label>
          <input type="radio" value={3} name={this.props.group} /> Sometimes
        </label>
        <br />
        <label>
          <input type="radio" value={4} name={this.props.group} /> Fairly often
        </label>
        <br />
        <label>
          <input type="radio" value={5} name={this.props.group} /> Often
        </label>
        <br />
        <label>
          <input type="radio" value={6} name={this.props.group} /> Almost always
        </label>
        <br />
        <label>
          <input type="radio" value={7} name={this.props.group} /> Always
        </label>
        <br />
        <br />
      </div>
    );
  }
}

export default RadioGroup;
