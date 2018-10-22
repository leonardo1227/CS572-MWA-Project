const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  date: Date,
  prospectiveStudent: { email: String },
  exams: [
    {
      _id: Number,
      date: Date,
      startTime: Date,
      endTime: Date,
      submitted: Boolean,
      invitationStatus: String,
      publishingDate: Date,
      result: Boolean,
      offTimeBrowser: Number,
      questions: [
        {
          _id: Number,
          problemStatement: String,
          answer: String,
          startTime: Date,
          endTime: Date,
          snapshots: [{ _id: Number, progress: String }]
        }
      ]
    }
  ]
});

module.exports = mongoose.model("applicationProcess", schema);
