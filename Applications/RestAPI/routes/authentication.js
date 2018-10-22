const express = require("express");
const route = express.Router();
const controller = require("../controllers/authentication");
route.use(express.json());

route.post("/", (request, response) => {
  let data = { request: request, response: response };
  controller.userRetriever.next(data);
});

module.exports = route;
