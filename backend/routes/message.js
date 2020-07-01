const router = require("express").Router();
let Message = require("../models/message");

router.route("/").get((_req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const body = req.body.body;

  newMessage = new Message({ username, title, body });

  newMessage
    .save()
    .then(() => res.json("Message added"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Message.findById(req.params.id)
    .then((message) => res.json(message))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.json("Message deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Message.findById(req.params.id)
    .then((message) => {
      message.username = req.body.username;
      message.title = req.body.title;
      message.body = req.body.body;

      message
        .save()
        .then(() => res.json("Message updated"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
