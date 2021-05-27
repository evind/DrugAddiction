import React from "react";
import EmailInput from "../../EmailInput";
import "./AddPatientForm.css";
import axios from "axios";
import { validate } from "react-email-validator";
import { res } from "react-email-validator";

class AddPatientForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      codeGenerated: false,
      email: "",
      emailError: true,
      responseMsg: "",
      initialFormState: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ initialFormState: false });
    let emailError = this.state.emailError;

    // Validate email
    if (!validate(this.state.email)) {
      this.setState({ emailError: true });
      emailError = true;
    } else {
      this.setState({ emailError: false });
      emailError = false;
    }

    if (!emailError) {
      axios
        .post(
          "http://localhost:5000/addpatient",
          {
            email: this.state.email,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        )
        .then((res) => {
          this.setState({ responseMsg: res.data.msg });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getEmailInput = (val) => {
    this.setState({ email: val }, () => {});
  };

  getEmailError = () => {
    console.log(this.state.errorMsg);
    console.log(this.state.errorMsg ? "yes" : "no");
    if (this.state.emailError && !this.state.initialFormState) {
      return <div className="ui error message">Please enter a valid email</div>;
    } else if (this.state.responseMsg === "Success") {
      return <div className="ui success message">{this.state.responseMsg}</div>;
    } else if (this.state.responseMsg) {
      return <div className="ui error message">{this.state.responseMsg}</div>;
    } else {
      return <div></div>;
    }
  };

  generateCode = () => {
    // 1. send generate code request to backend
    // 2. add code to database
    // 3. return code to frontend
    // 4. display backend response
    axios
      .get("http://127.0.0.1:5000/get_signup_code", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        this.setState({ code: res.data, codeGenerated: true });
      });
  };

  getButtonState = () => {
    if (!this.state.codeGenerated) {
      return (
        <button type="button" onClick={this.generateCode}>
          Generate Code
        </button>
      );
    } else {
      return (
        <button type="button" onClick={this.generateCode} disabled>
          Generate Code
        </button>
      );
    }
  };

  getCode = () => {
    console.log(this.state.code);
    if (this.state.code) {
      return <h2>Sign up code: {this.state.code}</h2>;
    }
  };

  render() {
    return (
      <div className="add-patient-form-container">
        <h3>Add Patient</h3>
        <div>
          If they patient has already registered for an account, search here:
        </div>
        <br />
        <form className="add-patient-form" onSubmit={this.handleSubmit}>
          <div className="add-patient-text-input">
            <EmailInput onChangeCallback={this.getEmailInput} />
            {this.getEmailError()}
          </div>
          <div className="buttons">
            <input type="submit" value="Submit" />
          </div>
        </form>
        <br />
        <div className="generate-code">
          If the patient has not signed up for an account, you can generate a
          sign up code for them here:
        </div>
        <div className="buttons">{this.getButtonState()}</div>
        {this.getCode()}
      </div>
    );
  }
}

export default AddPatientForm;
