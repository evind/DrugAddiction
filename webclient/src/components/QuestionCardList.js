import React from 'react';
import QuestionCard from './QuestionCard';

const QuestionCardList = props => {
  console.log(props.data);
  console.log(props.questions);
  let i = 0;
  const questionCards = props.questions.map(qCard => {
    i++;
    return (
      <QuestionCard
        key={qCard.id}
        qNum={i}
        qText={qCard.question}
      />
    );
  });

  return <div>{questionCards}</div>;
}

export default QuestionCardList;
