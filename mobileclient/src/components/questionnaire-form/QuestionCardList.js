import React from 'react';
import QuestionCard from './QuestionCard';
import { questions } from './questions';


class QuestionCardList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      formAnswers: {}
    };
  }

  setFormAnswers = (key, val) => {
    const data = { 
      ...this.state.formAnswers,
      [key]: val
     }

    this.setState({ formAnswers: data });
    this.props.onChange(data);
  }

  getQuestionList(onChange) {
    const QuestionList = questions.map((question) => {
      return (
        <QuestionCard 
          key={question.id}
          questionId={question.id}
          questionText={question.text}
          onChange={onChange}
      />
      );
    });
    return QuestionList;
  }

  render() {
    return (
      <div>
        { this.getQuestionList(this.setFormAnswers) }
      </div>
    );
  }
}

export default QuestionCardList;