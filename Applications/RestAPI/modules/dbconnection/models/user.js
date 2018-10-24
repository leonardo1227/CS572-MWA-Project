const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  role: String,
  name: String,
  email: String,
  password: String,
  actived: Boolean
});

schema.methods.generateId = callbackFunction => {
  mongoose.model("user").count((err, count) => {
    callbackFunction(err, count + 1);
  });
};

schema.methods.createUser = (content, callbackFunction) => {

  schema.methods.generateId((err, id) => {
    content._id = id;
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
  })
}

schema.methods.reset = (callbackFunction) => {
  mongoose.model("user").remove({}, (err) => {
    if (err) throw err;

    callbackFunction({ success: 1 })
  })
}

schema.methods.changeStatus = (id, value, callbackFunction) => {
  mongoose.model("user").updateOne({ _id: id }, { $set: { actived: value } }, (err) => {
    if (err) throw err;

    callbackFunction({ value: value })
  })
}

module.exports = mongoose.model("user", schema);
