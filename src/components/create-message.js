import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  Header,
  TextArea,
  Message,
} from "semantic-ui-react";
import axios from "axios";

export default class CreateMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      failed_message: false,
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("logged_in") === null ||
      localStorage.getItem("logged_in") === "false"
    ) {
      console.log("redirecting...");
      window.location = "/login";
    }
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onMessageChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = () => {
    axios
      .post("http://localhost:5000/messages/add", {
        username: localStorage.getItem("username"),
        title: this.state.title,
        body: this.state.body,
      })
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        {this.state.failed_message && (
          <Message negative>
            <Message.Header>There Seems to be a Problem...</Message.Header>
            <p>
              This is most likely because either your title or body is empty
            </p>
          </Message>
        )}
        <Header as="h1">Post a Message: </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title: </label>
            <Form.Input type="text" onChange={this.onTitleChange} />
          </Form.Field>
          <Form.Field>
            <label>Message: </label>
            <TextArea
              placeholder="Type your message here"
              onChange={this.onMessageChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
