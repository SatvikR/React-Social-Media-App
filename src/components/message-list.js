import React, { Component } from "react";
import { Grid, Header, Container } from "semantic-ui-react";
import axios from "axios";

const Message = (props) => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={3}>
          <Header as="h2">{props.message.username}</Header>
        </Grid.Column>
        <Grid.Column width={13}>
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
      .get("http://localhost:5000/messages/")
      .then((res) => {
        this.setState({ messages: res.data });
        console.log(this.state.messages);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  messageList = () => {
    return this.state.messages.map((currentMessage) => {
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
