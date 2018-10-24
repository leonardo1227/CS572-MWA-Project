const express = require("express");
const exams = require("./exams");
const authentication = require("./authentication");
const staff = require("./staff");
const invitations = require("./invitations");
const questions = require("./questions");
const applicationProcess = require("./applicationProcess");
const routes = express.Router();

routes.use("/exams", exams);
routes.use("/authentication", authentication);
routes.use("/staff", staff);
routes.use("/invitations", invitations);
routes.use("/questions", questions);
routes.use("/applicationProcesses", applicationProcess);

module.exports = routes;
