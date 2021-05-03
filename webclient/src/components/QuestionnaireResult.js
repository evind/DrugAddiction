import React from 'react';
import axios from 'axios';
import QuestionCardList from './QuestionCardList';

class QuestionnaireResult extends React.Component {
  constructor(props) {
    super(props);

    //this.state = {
    //  data: {},
    //  questions: questionList.map((question) => {
    //    return question;
    //  })
    this.state = { data: {} };
    };
  }

  componentDidMount = async () => {

    const res = await axios.get(
      `http://localhost:5000/questionnaires/${this.props.questionnaireId}`
    );
    this.setState({ data: res.data});
  }

  yesOrNo() {
    if (this.state.data.has_drank) {
      return "Yes";
    } else {
      return "No";
    }
  }

  render() {
    return (
      <div>
        <div>
          Has drank in the last 2 months: {this.yesOrNo()}.
        </div>
        <div className="question-card-container">
          <QuestionCardList data={this.state.data} questions={this.state.questions} />
        </div>
      </div>
    );
  }
}

export default QuestionnaireResult;
