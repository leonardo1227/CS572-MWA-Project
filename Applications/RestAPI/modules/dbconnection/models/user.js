const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  actived: Boolean
});
module.exports = mongoose.model("user", schema);