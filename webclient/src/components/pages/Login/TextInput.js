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
      <div>
        <label>
          {this.props.label}
          <input
            type={this.props.type}
            name={this.props.name}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default TextInput;
