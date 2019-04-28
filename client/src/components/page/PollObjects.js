import React, { Component, Fragment } from "react";
import axios from "axios";
import { Badge } from "@material-ui/core";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";

import { AddCircle, DeleteSweep } from "@material-ui/icons";

export default class PollObjects extends Component {
  constructor() {
    super();

    this.state = {
      options: [],
      intervalIsSet: false,
      optionadd: "",
      erdis: "false",
      responsemsg:""
    };
  }

  onDeleteClick = id => {
    axios.delete(`/api/poll/${id}`);
  };
  componentDidMount = () => {
    this.getOptionsFromDb();
    // console.log("calling");
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenEdit = e => {
    this.setState({ erdis: "true" });
  };

  onClickChange = id => {
    axios.put(`/api/poll/responsedit/${id}/${this.state.responsemsg}`);
    this.setState({ erdis: "false" });
  };
  onAddclick = id => {
    // var newStateArray = this.state.options.slice();
    // newStateArray.push({
    //   option: this.state.optionadd,
    //   count: 0
    // });
    // this.setState({ options: newStateArray, optionadd: "" });
    axios.put(`/api/poll/options/${id}/${this.state.optionadd}`);

    this.getOptionsFromDb();
  };

  componentWillUnmount = () => {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  };

  getOptionsFromDb = () => {
    axios
      .get(`/api/poll/${this.props._id}`)
      .then(res => this.setState({ options: res.data }));
  };

  render() {
    return (
      <div>
        <div className="card mb-4">
          {this.props.element.studentid === this.props.studentid && (
            <Badge
              className="remove-btn text-sm-left"
              size="sm"
              onClick={this.onDeleteClick.bind(this, this.props._id)}
            >
              <DeleteSweep />
            </Badge>
          )}

          <div className="card-header d-flex bg-dark text-white text-justify">
            {this.props.element.studentid}
          </div>
          <div className="card-body">
            <h5>Question:</h5>
            <p className="card-text">{this.props.element.pollQuestion}</p>

            <h5>Option:</h5>
            {this.state.options.map(({ _id, option, count }) => (
              <Fragment key={_id}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <Input
                        addon
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder={option} disabled={true} />
                </InputGroup>
                <br />
              </Fragment>
            ))}
            <div className="d-flex flex-row">
              <Input
                type="text"
                name="optionadd"
                placeholder="which option you want to add"
                onChange={this.onChange}
              />

              <Badge
                className="m-2"
                key={this.props._id}
                onClick={this.onAddclick.bind(this, this.props._id)}
              >
                <AddCircle />
              </Badge>
            </div>
          </div>
          <div className="card-body">
            <h5>Response:</h5>
            <p className="card-text">{this.props.element.response}</p>
            {this.props.domain !== "student" && (
              <React.Fragment>
                <Button onClick={this.onOpenEdit}>edit response</Button>
                {this.state.erdis === "true" && (
                  <div className="d-flex flex-row">
                    <Input
                      placeholder={this.props.element.response}
                      name="responsemsg"
                      onChange={this.onChange}
                    />
                    <Button
                      onClick={this.onClickChange.bind(this, this.props._id)}
                    >
                      edit
                    </Button>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="card-footer text-muted text-right">
            {this.props.element.domain}
          </div>
        </div>
      </div>
    );
  }
}
