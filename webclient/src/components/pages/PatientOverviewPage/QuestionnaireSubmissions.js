import React from "react";
import SubmissionHeader from "./SubmissionHeader";
import SubmissionList from "./SubmissionList";

class QuestionnaireSubmission extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SubmissionHeader />
        <SubmissionList questionnaireData={this.props.questionnaireData} />
      </div>
    );
  }
}

export default QuestionnaireSubmission;
