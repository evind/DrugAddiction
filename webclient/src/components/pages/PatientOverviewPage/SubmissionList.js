import React from "react";
import "./SubmissionList.css";
import SubmissionListItem from "./SubmissionListItem";

class SubmissionList extends React.Component {
  constructor(props) {
    super(props);
  }

  generateList = () => {
    let i = 0;
    const submissionList = this.props.questionnaireData.map((listItem) => {
      i++;
      const date = listItem.submitted;
      const dateString = `
        ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
         ${date.getHours()}:${date.getMinutes()}
      `;
      return (
        <SubmissionListItem
          key={i}
          qId={listItem.id}
          date={dateString}
          score={listItem.score}
          relapseRisk={listItem.relapse_risk}
        />
      );
    });
    return submissionList;
  };

  render() {
    return <div className="qs-list-container">{this.generateList()}</div>;
  }
}

export default SubmissionList;
