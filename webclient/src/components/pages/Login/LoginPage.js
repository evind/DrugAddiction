import React from "react";
import TextInput from "../../TextInput";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./LoginPage.css";
import { validate } from "react-email-validator";

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
    event.preventDefault();
    this.setState({ initialFormState: false });

    console.log("++++++++++++++");
    console.log("PRE LOG:");
    console.log("initialFormState: ", this.state.initialFormState);
    console.log("emailError: ", this.state.emailError);
    console.log("passError: ", this.state.passwordError);
    console.log("invalidCredentials: ", this.state.invalidCredentials);

    // Validate email and password input
    if (!validate(this.state.email)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }

    if (this.state.password.length === 0) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }

    if (this.state.emailError || this.state.passwordError) {
      // do not make request
    } else {
      axios
        .post("http://localhost:5000/login", {
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
          if (err.response.status === 401) {
            this.setState({ invalidCredentials: true });
          }
        });
    }
    console.log("--------------");
    console.log("POST LOG:");
    console.log("initialFormState: ", this.state.initialFormState);
    console.log("emailError: ", this.state.emailError);
    console.log("passError: ", this.state.passwordError);
    console.log("invalidCredentials: ", this.state.invalidCredentials);
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
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <form className="login-form" onSubmit={this.handleLogin}>
          Please enter your login details
          <br />
          <br />
          <TextInput
            type="text"
            name="email"
            label="Email:"
            onChangeCallback={this.getEmailInput}
          />
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
            <button className="ui button" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </form>
      );
    }
  };

  render() {
    return <div className="login-container">{this.renderContent()}</div>;
  }
}

export default LoginPage;
