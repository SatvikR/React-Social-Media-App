const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected successfully");
});

const messagesRouter = require("./routes/message");
const usersRouter = require("./routes/users");

app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running successfully on port: ${port}`);
});
