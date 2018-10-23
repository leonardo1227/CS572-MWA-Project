const mongoose = require("mongoose");
const snapshotModel = require("../models/snapshot")

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
          snapshots: [snapshotModel]
        }
      ]
    }
  ]
});

module.exports = mongoose.model("applicationProcess", schema);
