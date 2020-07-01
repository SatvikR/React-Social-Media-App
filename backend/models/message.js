const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Message", messageSchema);

module.exports = Exercise;
