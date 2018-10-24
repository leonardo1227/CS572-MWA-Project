const express = require("express");
const route = express.Router();
const controller = require("../controllers/authentication");
const cors = require("cors");
route.use(express.json());
route.use(cors());

route.post("/", (request, response) => {
  let data = { request: request, response: response };
  controller.userRetriever.next(data);
});

module.exports = route;
