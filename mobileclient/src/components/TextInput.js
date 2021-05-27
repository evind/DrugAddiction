import React from "react";

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  onInputChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      this.props.onChangeCallback(this.state.value);
    });
  };

  render() {
    return (
      <div className="text-input-container">
        <div className="text-input-label">{this.props.label}</div>
        <div className="ui input">
          <input
            className="text-input"
            type={this.props.type}
            name={this.props.name}
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}

export default TextInput;
