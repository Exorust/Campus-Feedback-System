import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeedModal from "./components/page/FeedModal";
import Landing from "./components/page/Landing";
import Login from "./components/auth/login";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <FeedModal />
            <Landing />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
