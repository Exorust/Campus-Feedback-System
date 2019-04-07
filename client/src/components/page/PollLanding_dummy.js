import React, { Component } from "react";
import axios from "axios";
import { Container, ListGroup, Button, Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge, Checkbox } from "@material-ui/core";
import { ThumbUp, ThumbDown, Comment, AddCircle } from "@material-ui/icons";
//import PollObjects from "./PollObjects";

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
          <TransitionGroup className="poll-display" />
          {this.state.poll.map(({ _id, studentid, poll, like, dislike }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <div className="card">
                {studentid === this.props.studentid && (
                  <Badge
                    className="remove-btn text-sm-right"
                    color="error"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    -
                  </Badge>
                )}

                <div className="card-header d-flex bg-dark text-white text-justify">
                  {studentid}
                </div>
                <div className="card-body">
                  <p className="card-text">{poll}</p>
                </div>
                {this.state.options.map(({ option, count }) => (
                  <React.Fragment>
                    <Checkbox
                      checked={this.state.checkedA}
                      onChange={this.handleChange("checkedA")}
                      value="checkedA"
                    >
                      {option}
                    </Checkbox>
                    <Badge>{count}</Badge>
                  </React.Fragment>
                ))}
                <div className="d-flex flex-row">
                  <Input
                    type="text"
                    name="optionsadd"
                    placeholder="which option you want to add"
                    onChange={this.onChange}
                  />

                  <Badge className="m-2" onClick={this.onAddclick}>
                    <AddCircle />
                  </Badge>
                </div>
                <div className="d-flex flex-row">
                  <Button className="m-2" onClick={this.onLikeclick}>
                    <ThumbUp color={this.getlikeColor} />
                  </Button>
                  <Button className="m-2" onClick={this.onDislikeclick}>
                    <ThumbDown color={this.getdislikeColor} />
                  </Button>

                  <Button className="m-2" onClick={this.onLikeclick}>
                    <Comment />
                  </Button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default PollLanding;
