import axios from "axios";
import React from "react";
import TextInput from "../../TextInput";
import { Link } from "react-router-dom";
import "./SignUpPage.css";
import { urls } from "../../../Utils";
import { Zoom } from "@material-ui/core";

/* 
Create an object:
details: {
  signUpCode: optional
  doctorId: null or request doctor ID from sign up code,
  firstName:
  lastName:
  gender:
  email:
  password:
  dob:
  address:
  city:
  region:
  country:
  postcode:
  phone:
  created: should do this in back end
}
*/

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        signUpCode: null,
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        dob: "",
        address: "",
        city: "",
        region: "",
        country: "",
        postcode: "",
        phone: "",
      },
      submitted: false,
    };
  }

  handleChange = (event, key) => {
    console.log("this is my value: ", event.target.value);
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      ...this.state.formData,
      dob: new Date(this.state.formData.dob).getTime(),
    };

    axios
      .post(urls.backendURL + "/patientregister", {
        postData,
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ submitted: true });
  };

  render() {
    return (
      <>
        {this.state.submitted ? (
          <div>
            <h2>Form submitted</h2>
            <Link className="ui button" to="/">
              Home
            </Link>
          </div>
        ) : (
          <div>
            <div className="sign-up-card">
              <h3>Please enter the following details</h3>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>
                    First name:
                    <input
                      type="text"
                      value={this.state.formData.firstName}
                      onChange={(event) => {
                        this.handleChange(event, "firstName");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Last name:
                    <input
                      type="text"
                      value={this.state.formData.lastName}
                      onChange={(event) => {
                        this.handleChange(event, "lastName");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Gender
                    <input
                      type="text"
                      value={this.state.formData.gender}
                      onChange={(event) => {
                        this.handleChange(event, "gender");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email:
                    <input
                      type="text"
                      value={this.state.formData.email}
                      onChange={(event) => {
                        this.handleChange(event, "email");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={this.state.formData.password}
                      onChange={(event) => {
                        this.handleChange(event, "password");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Date of birth:
                    <input
                      type="text"
                      value={this.state.formData.dob}
                      onChange={(event) => {
                        this.handleChange(event, "dob");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Address:
                    <input
                      type="text"
                      value={this.state.formData.address}
                      onChange={(event) => {
                        this.handleChange(event, "address");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    City:
                    <input
                      type="text"
                      value={this.state.formData.city}
                      onChange={(event) => {
                        this.handleChange(event, "city");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Region:
                    <input
                      type="text"
                      value={this.state.formData.region}
                      onChange={(event) => {
                        this.handleChange(event, "region");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Country:
                    <input
                      type="text"
                      value={this.state.formData.country}
                      onChange={(event) => {
                        this.handleChange(event, "country");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Postcode:
                    <input
                      type="text"
                      value={this.state.formData.postcode}
                      onChange={(event) => {
                        this.handleChange(event, "postcode");
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Phone #:
                    <input
                      type="text"
                      value={this.state.formData.phone}
                      onChange={(event) => {
                        this.handleChange(event, "phone");
                      }}
                    />
                  </label>
                </div>

                <button type="submit" className="ui primary button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SignUpPage;
