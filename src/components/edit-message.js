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

export default class EditMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      failed_message: false,
    };
  }

  componentDidMount() {
    axios
      .get("/messages/" + this.props.match.params.id)
      .then((res) => {
        this.setState({ title: res.data.title, body: res.data.body });
      })
      .catch((err) => console.log(err));
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onMessageChange = (event) => {
    this.setState({ body: event.target.value });
  };

  handleSubmit = () => {
    axios
      .post("/messages/update/" + this.props.match.params.id, {
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
        <Header as="h1">Edit a Message: </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title: </label>
            <Form.Input
              type="text"
              onChange={this.onTitleChange}
              value={this.state.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Message: </label>
            <TextArea
              placeholder="Type your message here"
              onChange={this.onMessageChange}
              value={this.state.body}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
