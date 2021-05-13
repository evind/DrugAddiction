import React from "react";
import QuestionCard from "./QuestionCard";
import { questions } from "./questions";

class QuestionCardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formAnswers: {},
    };
  }

  setFormAnswers = (key, val) => {
    const data = {
      ...this.state.formAnswers,
      [key]: val,
    };

    this.setState({ formAnswers: data });
    this.props.onChangeCallback(data);
  };

  getQuestionList() {
    const QuestionList = questions.map((question) => {
      return (
        <QuestionCard
          key={question.id}
          group={question.id}
          questionText={question.text}
          onChangeCallback={this.setFormAnswers}
        />
      );
    });
    return QuestionList;
  }

  render() {
    return <div>{this.getQuestionList()}</div>;
  }
}

export default QuestionCardList;
