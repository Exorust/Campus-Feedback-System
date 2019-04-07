import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import axios from "axios";

class FeedModal extends Component {
  state = {
    modal_t: false,
    dropdown: false,
    feedback: "",
    domain: "select"
  };

  toggle_modal = () => {
    this.setState({
      modal_t: !this.state.modal_t
    });
  };

  toggle_dropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ondropChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.toggle_dropdown();
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.id);
    console.log(this.state.feedback);

    const data = {
      id: this.props.id,
      feedback: this.state.feedback,
      domain: this.state.domain
    };
    /*
    fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      body: data
    }).then(res => console.log(res));*/
    axios.post("/api/feedback", data).then(res => console.log(res));
    this.toggle_modal();
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle_modal}
        >
          give a feedback
        </Button>

        <Modal isOpen={this.state.modal_t} toggle={this.toggle_modal}>
          <ModalHeader toggle={this.toggle_modal}>Add a feedback</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Give feedback</Label>

                <br />
                <Input
                  type="text"
                  name="id"
                  value={this.props.id}
                  disabled={true}
                />
                <br />
                <Input
                  type="textarea"
                  name="feedback"
                  placeholder="enter here about the feedback"
                  onChange={this.onChange}
                />
                <br />
                <Dropdown
                  isOpen={this.state.dropdown}
                  toggle={this.toggle_dropdown}
                >
                  <DropdownToggle caret>{this.state.domain}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={this.onChange}
                      name="domain"
                      value="mess"
                    >
                      Mess
                    </DropdownItem>
                    <DropdownItem
                      onClick={this.onChange}
                      name="domain"
                      value="hostel"
                    >
                      hostel
                    </DropdownItem>
                    <DropdownItem
                      onClick={this.onChange}
                      name="domain"
                      vaalue="sac"
                    >
                      sac
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  give feedback
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
