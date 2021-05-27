import React from "react";
import TextInput from "../../TextInput";
import "./SignUpPage.css";

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
  render() {
    return (
      <div>
        <div className="sign-up-card">
          <h3>Please enter the following details</h3>
          <form>
            <label>First name:</label>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
