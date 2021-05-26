import React from "react";
import TextInput from "../../TextInput";
import { Link } from "react-router-dom";
import "./AddPatientForm.css";

class AddPatientForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="add-patient-form-container">
        <form>
          <TextInput type="text" name="email" label="Email:" />
        </form>
      </div>
    );
  }
}

export default AddPatientForm;
