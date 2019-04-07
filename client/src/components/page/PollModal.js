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

class PollModal extends Component {
  state = {
    modal_t: false,
    dropdown: false,
    poll: "",
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
      poll: this.state.poll,
      domain: this.state.domain
    };
    /*
    fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      body: data
    }).then(res => console.log(res));*/
    axios.post("/api/poll", data).then(res => console.log(res));
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
          start a poll
        </Button>

        <Modal isOpen={this.state.modal_t} toggle={this.toggle_modal}>
          <ModalHeader toggle={this.toggle_modal}>start a poll</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>What's the poll about</Label>

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
                  name="poll"
                  placeholder="enter here about the poll"
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

                <Button
                  color="dark"
                  onClick={this.onSubmit}
                  style={{ marginTop: "2rem" }}
                  block
                >
                  start poll
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PollModal;
