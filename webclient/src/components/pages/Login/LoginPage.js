import React from "react";
import TextInput from "./TextInput";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      accessToken: "",
      refreshToken: "",
    };
  }

  getEmailInput = (val) => {
    this.setState({ email: val }, () => {
      console.log("this.state.email: ", this.state.email);
    });
  };

  getPasswordInput = (val) => {
    this.setState({ password: val }, () => {
      console.log("this.state.password: ", this.state.password);
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    console.log("submitting...");

    axios
      .post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        window.localStorage.setItem("accessToken", res.data.access_token);
        window.localStorage.setItem("refreshToken", res.data.refresh_token);
        // this.props.history.push("/dashboard");
        console.log("this.props: ", this.props);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log("### Login details incorrect");
        }
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <TextInput
            type="text"
            name="email"
            label="Email:"
            onChangeCallback={this.getEmailInput}
          />
          <TextInput
            type="password"
            name="password"
            label="Password:"
            onChangeCallback={this.getPasswordInput}
          />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
