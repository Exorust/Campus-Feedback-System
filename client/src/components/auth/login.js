import React, { Component } from "react";
import axios from "axios";

export default class login extends Component {
  state = {
    loginid: "",
    password: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .get(`/api/feedback/auth/${this.state.loginid}/${this.state.password}`)
      .then(res => {
        console.log(res.data.isstudent);
        if (res.data.response === "yes") {
          // console.log("handleupdate will be called");
          this.props.handleToUpdate(
            this.state.loginid,
            res.data.isstudent,
            "yes"
          );
        }
      });
  };
  render() {
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your account</p>
                <form onSubmit={this.onSubmit} className="text-center">
                  <label>Username: </label>
                  <input
                    type="text"
                    name="loginid"
                    className="ml-4 block"
                    placeholder="enter your login id"
                    onChange={this.onChange}
                  />
                  <br />
                  <br />
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    className="ml-4"
                    placeholder="enter your password"
                    onChange={this.onChange}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
