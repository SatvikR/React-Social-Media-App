import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Message = (props) => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={6}>
          <p style={{ fontSize: 20 }}>
            <b>{props.message.username}</b>
          </p>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as="h3">{props.message.title}</Header>
          <p style={{ fontSize: 16 }}>{props.message.body}</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <div style={{ textAlign: "center", padding: "12px" }}>
            <p style={{ fontSize: 20 }}>
              <Link to={"/edit/" + props.message._id}>edit</Link> |{" "}
              <a
                href="# "
                onClick={() => {
                  props.deleteMessage(props.message._id);
                }}
              >
                delete
              </a>
            </p>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default class MyMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
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
    axios
      .get("http://localhost:5000/messages/")
      .then((res) => {
        this.setState({ messages: res.data });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  deleteMessage = (id) => {
    axios.delete("http://localhost:5000/message/" + id).then((res) => {
      console.log(res.data);
    });
    this.setState({
      messages: this.state.messages.filter((elem) => elem._id !== id),
    });
  };

  messageList = () => {
    const messageArray = this.state.messages.reverse();
    return messageArray.map((currentMessage) => {
      if (currentMessage.username === localStorage.username) {
        return (
          <Message
            message={currentMessage}
            deleteMessage={this.deleteMessage}
          />
        );
      }
      return null;
    });
  };

  render() {
    return (
      <Container>
        <Header as="h1">
          <u>My Messages: </u>
        </Header>
        <div className="messagelist">{this.messageList()}</div>
      </Container>
    );
  }
}
