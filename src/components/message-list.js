import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
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
        <Grid.Column width={10}>
          <Header as="h3">{props.message.title}</Header>
          <p style={{ fontSize: 16 }}>{props.message.body}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    axios
      .get("/messages/")
      .then((res) => {
        this.setState({ messages: res.data });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  messageList = () => {
    const messageArray = this.state.messages.reverse();
    return messageArray.map((currentMessage) => {
      return <Message message={currentMessage} />;
    });
  };

  render() {
    return (
      <Container>
        <Header as="h1">
          <u>Messages: </u>
        </Header>
        <div className="messagelist">{this.messageList()}</div>
      </Container>
    );
  }
}
