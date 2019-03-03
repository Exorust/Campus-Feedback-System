import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      feedbacks: [],
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
    fetch("http://localhost:4000/api/feedback")
      .then(res => res.json())
      .then(feedbacks => this.setState({ feedbacks }));
  };

  render() {
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="feedback-display" />
          <div className="row">
            {this.state.feedbacks.map(({ _id, studentid, feedback }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <div className="col-sm-3 h-100 w-200">
                  <div className="card">
                    {studentid === this.props.studentid && (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    )}
                    <div className="card-body">
                      <h3 className="card-title">{studentid}</h3>
                      <p className="card-text">{feedback}</p>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </div>
        </ListGroup>
      </Container>
    );
  }
}

export default Landing;
