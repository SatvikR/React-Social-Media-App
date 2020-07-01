import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import Navbar from "./components/navbar";
import CreateMessage from "./components/create-message";
import EditMessage from "./components/edit-message";
import Login from "./components/login";
import MessageList from "./components/message-list";
import MyMessages from "./components/my-messages";
import SignUp from "./components/sign-up";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={MessageList} />
        <Route path="/login" exact component={Login} />
        <Route path="/create" exact component={CreateMessage} />
        <Route path="/edit/:id" exact component={EditMessage} />
        <Route path="/messages" exact component={MyMessages} />
        <Route path="/sign-up" exact component={SignUp} />
      </div>
    </Router>
  );
};

export default App;
