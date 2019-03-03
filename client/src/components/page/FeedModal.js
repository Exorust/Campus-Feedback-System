import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class FeedModal extends Component {
  state = {
    modal: false,
    id: "",
    feedback: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.id);
    console.log(this.state.feedback);

    const data = {
      id: this.state.id,
      feedback: this.state.feedback
    };
    /*
    fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      body: data
    }).then(res => console.log(res));*/
    axios.post("/api/feedback", data).then(res => console.log(res));
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          give a feedback
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add A Feedback</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>FEEDBACK</Label>
                <Input
                  type="text"
                  name="id"
                  placeholder="Give the id number"
                  onChange={this.onChange}
                />
                <br />
                <Input
                  type="textarea"
                  name="feedback"
                  placeholder="Give the feedback"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add the feedback
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FeedModal;
