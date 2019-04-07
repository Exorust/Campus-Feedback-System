import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge } from "@material-ui/core";
import { DeleteSweep } from "@material-ui/icons";

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      feedback: [],
      intervalIsSet: false
    };
  }

  onDeleteClick = id => {
    axios.delete(`/api/feedback/${id}`);
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    axios
      .get("/api/feedback")
      .then(res => this.setState({ feedback: res.data }));
  };

  render() {
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="feedback-display" />
          {this.state.feedback.map(({ _id, studentid, feedback, domain }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              {studentid === this.props.studentid && (
                <div className="card mb-4">
                  <Badge
                    className="remove-btn "
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    <DeleteSweep />
                  </Badge>
                  <div className="card-header d-flex bg-dark text-white text-justify">
                    {studentid}
                  </div>
                  <div className="card-body">
                    <h5>Feed:</h5>
                    <p className="card-text">{feedback}</p>
                    <Button>view response</Button>
                  </div>
                  <div className="card-footer text-muted text-right">
                    {domain}
                  </div>
                </div>
              )}
            </CSSTransition>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default Landing;
