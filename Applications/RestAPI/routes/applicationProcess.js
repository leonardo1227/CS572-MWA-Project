const express = require("express");
const route = express.Router();
const cors = require("cors");
const controller = require("../controllers/applicationProcess");
route.use(cors());

route.get("/", (request, response) => {
  let data = { request: request, response: response };
  controller.getApplicationsToInvite.next(data);
});

module.exports = route;
