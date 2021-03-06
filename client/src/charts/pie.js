import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends Component {
  state = {
    chartData: {
      labels: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford"
      ],
      datasets: [
        {
          label: "Population",
          data: [617594, 181045, 153060, 106519, 105162, 95072],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ],
      displayTitle: true,
      displayLegend: true,
      legendPosition: "right"
    }
  };
  render() {
    return (
      <div>
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: this.state.displayTitle,
              text: "Largest Cities In " + this.state.location,
              fontSize: 25
            },
            legend: {
              display: this.state.displayLegend,
              position: this.state.legendPosition
            }
          }}
        />
      </div>
    );
  }
}
