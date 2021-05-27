import React, { Fragment } from "react";
import TextInput from "../../TextInput";
import EmailInput from "../../EmailInput";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { validate } from "react-email-validator";
import { urls } from "../../../Utils";
import "./LoginPage.css";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: true,
      passwordError: true,
      invalidCredentials: false,
      initialFormState: true,
      loginSuccess: false,
      accessToken: "",
      refreshToken: "",
    };
  }

  getEmailInput = (val) => {
    this.setState({ email: val }, () => {});
  };

  getPasswordInput = (val) => {
    this.setState({ password: val }, () => {});
  };

  handleLogin = (event) => {
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    event.preventDefault();
    this.setState({ initialFormState: false });

    // Validate email and password input
    if (!validate(this.state.email)) {
      this.setState({ emailError: true });
      emailError = true;
    } else {
      this.setState({ emailError: false });
      emailError = false;
    }

    if (this.state.password.length === 0) {
      this.setState({ passwordError: true });
      passwordError = true;
    } else {
      this.setState({ passwordError: false });
      passwordError = false;
    }

    if (!emailError && !passwordError) {
      axios
        .post(urls.backendURL + "/patientlogin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          window.localStorage.setItem("accessToken", res.data.access_token);
          window.localStorage.setItem("refreshToken", res.data.refresh_token);
          this.setState({ loginSuccess: true });
          console.log("this.props: ", this.props);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.status === 401) {
              this.setState({ invalidCredentials: true });
            }
          }
        });
    }
  };

  getEmailError = () => {
    if (this.state.emailError && !this.state.initialFormState) {
      return <div className="ui error message">Please enter a valid email</div>;
    } else {
      return <div></div>;
    }
  };

  getPasswordError = () => {
    if (this.state.passwordError && !this.state.initialFormState) {
      return <div className="ui error message">Please enter a password</div>;
    } else {
      return <div></div>;
    }
  };

  getInvalidCredentialsError = () => {
    if (this.state.invalidCredentials === true) {
      return <div className="ui error message">Invalid credentials</div>;
    } else {
      return <div></div>;
    }
  };

  loggedInCheck = () => {
    if (window.localStorage.getItem("accessToken")) {
      return true;
    } else {
      return false;
    }
  };

  renderContent = () => {
    if (this.loggedInCheck()) {
      return <Redirect to="/patient" />;
    } else {
      return (
        <div className="login-card">
          <form className="login-form" onSubmit={this.handleLogin}>
            Please enter your login details
            <br />
            <br />
            <EmailInput onChangeCallback={this.getEmailInput} />
            {this.getEmailError()}
            <TextInput
              type="password"
              name="password"
              label="Password:"
              onChangeCallback={this.getPasswordInput}
            />
            {this.getPasswordError()}
            {this.getInvalidCredentialsError()}
            <br />
            <div className="button-container">
              <Link className="ui button" to="/signup">
                Sign Up
              </Link>
              <button className="ui primary button" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
            <div>{this.state.emailError}</div>
          </form>
        </div>
      );
    }
  };

  render() {
    return <div className="login-container">{this.renderContent()}</div>;
  }
}

export default LoginPage;
