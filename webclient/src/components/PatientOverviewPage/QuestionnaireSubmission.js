import React from "react";
import QuestionnaireSubHeader from "./QuestionnaireSubHeader";
import QuestionnaireSubList from "./QuestionnaireSubList";

class QuestionnaireSubmission extends React.Component {
  render() {
    return (
      <div>
        <QuestionnaireSubHeader />
        <QuestionnaireSubList />
      </div>
    );
  }
}

export default QuestionnaireSubmission;
