import React from "react";

const tdStyle = {
  textAlign: "center",
};

class TableData extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: "" };
  }

  componentDidMount() {
    const name = this.props.name;
    const answer = this.props.ans;

    if (name == "Never" && answer == 1) {
      this.setState({ text: "X" });
    } else if (name == "Rarely" && answer == 2) {
      this.setState({ text: "X" });
    } else if (name == "Sometimes" && answer == 3) {
      this.setState({ text: "X" });
    } else if (name == "Fairly Often" && answer == 4) {
      this.setState({ text: "X" });
    } else if (name == "Often" && answer == 5) {
      this.setState({ text: "X" });
    } else if (name == "Almost Always" && answer == 6) {
      this.setState({ text: "X" });
    } else if (name == "Always" && answer == 7) {
      this.setState({ text: "X" });
    }
  }

  renderContent() {}

  render() {
    return (
      <td style={tdStyle} className="tData">
        {this.state.text}
      </td>
    );
  }
}

export default TableData;
