import React from "react";
import PatientDetails from "./PatientDetails";
import QuestionnaireSubmission from "./QuestionnaireSubmissions";
import Chart from "react-google-charts";
import axios from "axios";
import { addLeadingZero } from "../../../Utils";
import "./PatientOverviewPage.css";

class PatientOverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dataRetrieved: false, data: {}, chartData: [] };
  }

  componentDidMount = () => {
    const paramId = this.props.match.params.id;
    axios
      .get(`http://127.0.0.1:5000/patientoverview/${paramId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // Date submitted is retrieved as a string, convert to JavaScript date
        const arr = res.data.questionnaire_data;
        for (let i = 0; i < arr.length; i++) {
          const date = new Date(arr[i].submitted);
          res.data.questionnaire_data[i].submitted = date;
        }

        // Sort questionnaire data by date (most recent first)
        arr.sort((a, b) => {
          return b.submitted - a.submitted;
        });

        // Get (up to) the last 6 questionnaire submission data to draw the chart
        const chartData = [];
        for (let i = 0; i < arr.length && i < 6; i++) {
          const d = arr[i].submitted;
          const date = `${addLeadingZero(d.getDate())}/${addLeadingZero(
            d.getMonth() + 1
          )}`;
          chartData.push([date, arr[i].relapse_risk]);
        }
        chartData.push(["Date", "Risk (%)"]);
        chartData.reverse();

        this.setState({
          dataRetrieved: true,
          data: res.data,
          chartData: chartData,
        });
      });
  };

  renderPatientDetails = () => {
    if (this.state.dataRetrieved) {
      return (
        <div>
          <div className="patient-overview-top">
            <PatientDetails patientDetails={this.state.data.patient_details} />
            <div className="patient-overview-chart">
              <Chart
                width={450}
                height={"200px"}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={this.state.chartData}
                options={{
                  title: "Relapse risk in the next 2 months (%)",
                  hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
                  vAxis: { minValue: 0 },
                  // For the legend to fit, we make the chart area smaller
                  chartArea: { width: "50%", height: "70%" },
                  // lineWidth: 25
                }}
              />
            </div>
          </div>
          <br />
          <br />
          <QuestionnaireSubmission
            questionnaireData={this.state.data.questionnaire_data}
          />
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  };

  render() {
    return (
      <div className="patient-overview-container">
        {this.renderPatientDetails()}
      </div>
    );
  }
}

export default PatientOverviewPage;
