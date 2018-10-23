const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  problemStatement: String,
  actived: Boolean
});

schema.methods.findOnlyActived = (callbackFunction)=>{
  mongoose.model('question').find().where('actived').equals(true).exec(callbackFunction); 
}

module.exports = mongoose.model("question", schema);
