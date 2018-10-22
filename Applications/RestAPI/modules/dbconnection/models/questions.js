const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  problemStatement: String,
  actived: Boolean
});
module.exports = mongoose.model("question", schema);
