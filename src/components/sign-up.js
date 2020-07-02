import React, { Component } from "react";
import { Container, Header, Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwords_match: true,
    };
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onVerifierChange = (event) => {
    this.setState({
      passwords_match: this.state.password === event.target.value,
    });
  };

  handleSubmit = () => {
    axios
      .post("/users/add", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Error: ${err}`));

    localStorage.setItem("username", this.state.username);
    localStorage.setItem("password", this.state.password);
    localStorage.setItem("logged_in", true);

    window.location = "/";
  };

  render() {
    return (
      <Container>
        <Header as="h1"> Sign Up: </Header>
        {!this.state.passwords_match && (
          <Message warning>
            <Message.Header>Your Passwords don't match!</Message.Header>
            <p>Please make sure your passwords match</p>
          </Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Username: </label>
            <input
              name="username"
              onChange={this.onUsernameChange}
              placeholder="ex. username123"
            />
          </Form.Field>
          <Form.Field>
            <label>Password: </label>
            <Form.Input
              name="password"
              onChange={this.onPasswordChange}
              placeholder="ex. password123"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <label>Repeat Password: </label>
            <Form.Input
              name="repeat-password"
              onChange={this.onVerifierChange}
              placeholder="ex. password123"
              type="password"
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
