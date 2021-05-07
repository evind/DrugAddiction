import React from 'react';
import ResponseSlider from './ResponseSlider';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { val: null };
  }

  getSliderValue = (val) => {
    this.props.onChange(this.props.questionId, val);
  }

  render() {
    return (
      <div>
        <ResponseSlider 
          questionText={this.props.questionText} 
          onChange={this.getSliderValue}
        />
      </div>
    );
  }
}

export default QuestionCard;