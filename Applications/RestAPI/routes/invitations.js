const express = require("express");
const route = express.Router();
route.use(express.json());
const controller = require("../controllers/invitations");

route.post("/send", (request, response) => {
  let data = { request: request, response: response };
  controller.examObjectCreator.next(data);
});

route.get("/answer", (request, response) => {
  let data = { request: request, response: response };
  controller.invitationHashDecrypter.next(data);
});

module.exports = route;
