const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  snap: String,
  time: String,
  duration: String
});
module.exports = schema;
