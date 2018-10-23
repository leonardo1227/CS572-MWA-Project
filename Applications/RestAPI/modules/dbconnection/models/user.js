const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  role: String,
  name: String,
  email: String,
  password: String,
  actived: Boolean
});

schema.methods.createUser = (content, callbackFunction) => {
  mongoose
    .model("user")
    .insertMany(content,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callbackFunction(result);
        }
      })
}

module.exports = mongoose.model("user", schema);
