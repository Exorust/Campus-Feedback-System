import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PieChart from "./charts/pie.js";

import FeedModal from "./components/page/FeedModal";
import PollModal from "./components/page/PollModal";
import Landing from "./components/page/Landing";
import Login from "./components/auth/login";
import Navbar from "./components/layout/Navbar";
import PollLanding from "./components/page/PollLanding";
import { Typography } from "@material-ui/core";
import { Subject, TrendingUp } from "@material-ui/icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      loginstatus: "no",
      isstudent: "no"
    };
    this.style1 = {
      padding: 5,
      marginTop: 2.5,
      marginBottom: 2.5,
      align: "center"
    };
    this.style2 = {
      padding: 20,
      marginTop: 10,
      marginBottom: 20,
      marginRight: 20,
      height: 400,
      overflow: "auto"
    };
  }
  handleToUpdate = (userid, isstudent, loginstatus) => {
    console.log(isstudent);
    this.setState({
      userid,
      isstudent,
      loginstatus
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar loginstatus={this.state.loginstatus} />
          {this.state.loginstatus === "no" && (
            <Login handleToUpdate={this.handleToUpdate} />
          )}
          {this.state.loginstatus === "yes" && (
            <div className="container">
              {this.state.isstudent === "yes" && (
                <React.Fragment>
                  <Grid container>
                    <Grid item sm>
                      <Typography>
                        <FeedModal id={this.state.userid} />
                        <PollModal id={this.state.userid} />
                      </Typography>
                    </Grid>
                    <Grid item sm>
                      <Typography>
                        <PieChart />
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm>
                      <Typography align="center">
                        <h1>my feeds</h1>
                        <Subject fontSize="large" />
                      </Typography>
                      <Paper style={this.style2}>
                        <Landing studentid={this.state.userid} />
                      </Paper>
                    </Grid>

                    <Grid item sm>
                      <Typography align="center">
                        <h1>recent polls</h1>
                        <TrendingUp fontSize="large" />
                      </Typography>
                      <Paper style={this.style2}>
                        <PollLanding studentid={this.state.userid} />
                      </Paper>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
