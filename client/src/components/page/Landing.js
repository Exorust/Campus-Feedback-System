import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge } from "@material-ui/core";
import { DeleteSweep, CheckBox } from "@material-ui/icons";

class Landing extends Component {
  signal = axios.CancelToken.source();
  constructor() {
    super();
    this.state = {
      // isLoading: false,
      feedback: [],
      intervalIsSet: false
    };
  }

  onDeleteClick = id => {
    axios.delete(`/api/feedback/${id}`);
  };

  onMarkDone = id => {
    axios.put(`/api/feedback/responsedit/${id}`);
  };
  componentDidMount() {
    // this._isMounted = true;
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    // this.signal.cancel("Api is being canceled");
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = async () => {
    axios.get("/api/feedback").then(res => {
      this.setState({ feedback: res.data });
    });

    // try {
    //   this.setState({ isLoading: true });
    //   const response = await axios.get("/api/feedback", {
    //     cancelToken: this.signal.token
    //   });
    //   this.setState({ feedback: response.data, isLoading: true });
    // } catch (err) {
    //   if (axios.isCancel(err)) {
    //     console.log("Error: ", err.message); // => prints: Api is being canceled
    //   } else {
    //     this.setState({ isLoading: false });
    //   }
    // }
  };

  render() {
    return (
      <Container>
        {this.state.feedback.map(
          ({ _id, studentid, feedback, response, domain }) =>
            (studentid === this.props.studentid ||
              (domain === this.props.domain && response !== "done")) && (
              <div className="card mb-4" key={_id}>
                {domain !== this.props.domain && (
                  <Badge
                    className="remove-btn "
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    <DeleteSweep />
                  </Badge>
                )}

                {domain === this.props.domain && (
                  <div className="d-flex flex-row">
                    <Badge
                      className="remove-btn "
                      size="sm"
                      onClick={this.onMarkDone.bind(this, _id)}
                    >
                      <CheckBox />
                    </Badge>
                    <p className="text-success">mark as done</p>
                  </div>
                )}

                <div className="card-header d-flex bg-dark text-white text-justify">
                  {studentid}
                </div>
                <div className="card-body">
                  <h5>Feed:</h5>
                  <p className="card-text">{feedback}</p>
                  {response === "done" ? (
                    <p className="text-success">approved</p>
                  ) : (
                    <p className="text-danger">pending</p>
                  )}
                </div>
                <div className="card-footer text-muted text-right">
                  {domain}
                </div>
              </div>
            )
        )}
      </Container>
    );
  }
}

export default Landing;
