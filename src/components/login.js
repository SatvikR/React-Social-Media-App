import React, { Component } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Segment,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      failed_login: false,
    };
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    axios
      .post("/users/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        const found_user = res.data;
        if (found_user.length === 0) {
          this.setState({ failed_login: true });
        } else {
          localStorage.setItem("username", this.state.username);
          localStorage.setItem("password", this.state.password);
          localStorage.setItem("logged_in", true);

          window.location = "/";

          return;
        }
      });
  };

  handleLogout = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    localStorage.setItem("logged_in", false);

    window.location = "/";
  };

  render() {
    if (localStorage.getItem("logged_in") === "true") {
      return (
        <Container>
          <Form onSubmit={this.handleLogout}>
            <Header as="h1" textAlign="center">
              <u>You are currently logged in as:</u>
              {"  "}
              {localStorage.getItem("username")}
            </Header>
            <Segment basic textAlign={"center"}>
              <Button type="submit" style={{ textAlign: "center" }}>
                Logout
              </Button>
            </Segment>
          </Form>
        </Container>
      );
    } else {
      return (
        <Container>
          {this.state.failed_login && (
            <Message negative>
              <Message.Header>Login Failed!</Message.Header>
              <p>Either your username or password was incorrect.</p>
            </Message>
          )}
          <Header as="h1"> Login: </Header>
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
            <Button type="submit">Submit</Button>
            <p>
              Don't have an accout? Sign up <Link to={"/sign-up"}>here</Link>
            </p>
          </Form>
        </Container>
      );
    }
  }
}
