require("dotenv").config();
const mongoose = require("mongoose");
const models = require("./models");
mongoose.connect(
  "mongodb://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST +
    ":" +
    process.env.DB_PORT +
    "/" +
    process.env.DB_NAME,
  { useNewUrlParser: true }
);

module.exports.mongoose = mongoose;
module.exports.models = models;
