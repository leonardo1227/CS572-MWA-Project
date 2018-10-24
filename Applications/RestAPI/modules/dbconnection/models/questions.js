const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  problemStatement: String,
  actived: Boolean
});

schema.methods.generateId = callbackFunction => {
  mongoose.model("question").count((err, count) => {
    callbackFunction(err, count + 1);
  });
};

schema.methods.findOnlyActived = (callbackFunction) => {
  mongoose.model('question').find().where('actived').equals(true).exec(callbackFunction);
}

schema.methods.insertQuestion = (question, status, callbackFunction) => {
  schema.methods.generateId((err, id) => {
    mongoose.model('question').insertMany({ _id: id, problemStatement: question, actived: status }, (err, res) => {
      if (err) throw err;

      callbackFunction(res);
    })
  })
}

module.exports = mongoose.model("question", schema);
