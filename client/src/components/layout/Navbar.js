import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/login";
import Signup from "../auth/signup";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/FeedbackForm">
              Feedback
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {this.props.loginstatus === "no" && (
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <Login />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      <Signup />
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
