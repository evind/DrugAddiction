import React from 'react';
import QuestionCardList from './QuestionCardList';
import axios from 'axios';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { submitted: false, formAnswers: {} };
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
    console.log(this.state.formAnswers);

    const data = {
      patient_id: 4,
      submitted: Date.now().toString(),
      has_drank: Math.random() < 0.5,
      score: Object.values(this.state.formAnswers).reduce(
        (accumulator, currentValue) => accumulator + currentValue),
      relapse_risk: 42,
      ...this.state.formAnswers
    };

    axios.post('http://127.0.0.1:5000/submitquestionnaire', data);
    alert("Form submitted");
  }

  getFormAnswers = (data) => {
    this.setState({ formAnswers: {...data} });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <QuestionCardList
            onChange={this.getFormAnswers}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default QuestionForm;