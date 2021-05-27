import React from "react";
import TextInput from "./TextInput";

class EmailInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "" };
  }

  onInputChange = (val) => {
    this.props.onChangeCallback(val);
  };

  render() {
    return (
      <TextInput
        type="text"
        name="email"
        label="Email:"
        onChangeCallback={this.onInputChange}
      />
    );
  }
}

export default EmailInput;
