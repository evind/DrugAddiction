import React from "react";

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      console.log(this.props.name, ":", this.state.value);
      this.props.onChangeCallback(this.state.value);
    });
  };

  render() {
    return (
      <div className="text-input-container">
        <div className="text-input-label">{this.props.label}</div>
        <div className="ui input">
          <input
            type={this.props.type}
            name={this.props.name}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default TextInput;
