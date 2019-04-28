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
import { Typography, Switch } from "@material-ui/core";
import {
  AddCircle,
  Subject,
  TrendingUp,
  HomeOutlined
} from "@material-ui/icons";
import { Button, Container } from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      loginstatus: "no",
      // isstudent: "no",
      domain: "",
      addclick: false
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

  handleToUpdate = (userid, domain, loginstatus) => {
    // console.log(isstudent);
    this.setState({
      userid,
      loginstatus,
      domain
    });
  };

  toggle_dropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  onClick = () => {
    this.setState({
      addclick: !this.state.addclick
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          {this.state.loginstatus === "no" && (
            <Login handleToUpdate={this.handleToUpdate} />
          )}
          <div className="container">
            {this.state.loginstatus === "yes" &&
              this.state.domain === "student" && (
                <React.Fragment>
                  <div className="d-flex flex-row text-primary">
                    <HomeOutlined />
                    <p>{this.state.domain}</p>
                  </div>
                  <Button onClick={this.onClick} className="m-4">
                    <AddCircle />
                  </Button>

                  {this.state.addclick && (
                    <React.Fragment>
                      <FeedModal id={this.state.userid} />
                      <PollModal id={this.state.userid} />
                    </React.Fragment>
                  )}
                  <Grid container>
                    <Grid item sm>
                      <h1>My Requests</h1>
                      <Subject fontSize="large" />

                      <Paper style={this.style2}>
                        <Landing studentid={this.state.userid} />
                      </Paper>
                    </Grid>

                    <Grid item sm>
                      <h1>Recent polls</h1>
                      <TrendingUp fontSize="large" />

                      <Paper style={this.style2}>
                        <PollLanding
                          studentid={this.state.userid}
                          domain={this.state.domain}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}

            {this.state.loginstatus === "yes" &&
              this.state.domain !== "student" && (
                <React.Fragment>
                  <div className="d-flex flex-row">
                    <HomeOutlined />
                    <p>{this.state.domain}</p>
                  </div>
                  <Grid container>
                    <Grid item sm>
                      <h1>Recent Requests</h1>
                      <Subject fontSize="large" />

                      <Paper style={this.style2}>
                        <Landing domain={this.state.domain} />
                      </Paper>
                    </Grid>

                    <Grid item sm>
                      <h1>Recent polls</h1>
                      <TrendingUp fontSize="large" />

                      <Paper style={this.style2}>
                        <PollLanding domain={this.state.domain} />
                      </Paper>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
