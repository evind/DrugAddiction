import React from 'react';
import axios from 'axios';

class PostTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    const data = {
      patient_id: 4,
      submitted: null,
      score: 28,
      relapse_risk: 80,
      has_drank: true,
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
      q8: 1,
      q9: 1,
      q10: 1,
      q11: 1,
      q12: 1,
      q13: 1,
      q14: 1,
      q15: 1,
      q16: 1,
      q17: 1,
      q18: 1,
      q19: 1,
      q20: 1,
      q21: 1,
      q22: 1,
      q23: 1,
      q24: 1,
      q25: 1,
      q26: 1,
      q27: 1,
      q28: 1
    };

    // axios.post('http://127.0.0.1:5000/submitquestionnaire', JSON.stringify(data));
    axios.post('http://127.0.0.1:5000/submitquestionnaire', data);
  }

  render() {
    return (
      <div>
        post
      </div>
    );
  }
}

export default PostTest;