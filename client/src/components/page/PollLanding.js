import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { Badge, Checkbox } from "@material-ui/core";
// import { ThumbUp, ThumbDown, Comment, AddCircle } from "@material-ui/icons";
import PollObjects from "./PollObjects";

class PollLanding extends Component {
  constructor() {
    super();

    this.state = {
      poll: [],
      like: 0,
      intervalIsSet: false,
      optionsadd: "",
      options: []
    };
  }

  onDeleteClick = id => {
    axios.delete(`/api/poll/${id}`);
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddclick = () => {
    var newStateArray = this.state.options.slice();
    newStateArray.push({ option: this.state.optionsadd, count: 0 });
    this.setState({ options: newStateArray });
  };

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    axios.get("/api/poll").then(res => this.setState({ poll: res.data }));
  };

  render() {
    return (
      <Container>
        <ListGroup>
          {this.state.poll.map(mapelement => (
            <PollObjects
              key={mapelement._id}
              element={mapelement}
              studentid={this.props.studentid}
              _id={mapelement._id}
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default PollLanding;
