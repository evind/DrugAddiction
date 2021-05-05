import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionCardList = (props) => {
  let i = 0;
  const questionCards = props.data.results.map((questionCard) => {
    i++;
    return (
      <QuestionCard
        key={questionCard.id}
        qNum={i}
        qText={questionCard.question}
        qAnswer={questionCard.answer}
      />
    );
  });

  return <div>{questionCards}</div>;
};

export default QuestionCardList;
