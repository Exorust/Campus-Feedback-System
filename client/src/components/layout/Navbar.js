import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/login";
import Signup from "../auth/signup";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar sticky navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/FeedbackForm">
              <h1>Feedbuzz</h1>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
