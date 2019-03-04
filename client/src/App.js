import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeedModal from "./components/page/FeedModal";
import Landing from "./components/page/Landing";
import Login from "./components/auth/login";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      loginstatus: "no",
      isstudent: "no"
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
          <Navbar />
          {this.state.loginstatus === "no" && (
            <Login handleToUpdate={this.handleToUpdate} />
          )}
          {this.state.loginstatus === "yes" && (
            <div className="container">
              {this.state.isstudent === "yes" && (
                < FeedModal />
              )}
              <Landing studentid={this.state.userid} />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
