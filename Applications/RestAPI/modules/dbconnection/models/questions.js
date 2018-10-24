const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  problemStatement: String,
  actived: Boolean
});

schema.methods.findOnlyActived = callbackFunction => {
  mongoose
    .model("question")
    .find()
    .where("actived")
    .equals(true)
    .exec(callbackFunction);
};

schema.methods.getQuestionsForExam = (questionsNumber, callbackFunction) => {
  mongoose
    .model("question")
    .find({ actived: true })
    .distinct("_id", (err, result) => {
      let ids = [];
      while (ids.length < questionsNumber) {
        let number = Math.floor(Math.random() * (result.length - 1)) + 1;
        let id = result[number];
        if (ids.indexOf(id) < 0) {
          ids.push(id);
        }
      }
      mongoose
        .model("question")
        .find()
        .where("_id")
        .equals(ids)
        .exec(callbackFunction);
    });
};

module.exports = mongoose.model("question", schema);
