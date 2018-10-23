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

schema.methods.generateId = callbackFunction => {
  mongoose.model("applicationProcess").count((err, count) => {
    callbackFunction(err, count + 1);
  });
};

schema.methods.findOneByEmail = (email, callbackFunction) => {
  return mongoose
    .model("applicationProcess")
    .findOne({ prospectiveStudent: { email: email } }, callbackFunction);
};

schema.methods.generateExamId = (applicationProcessId, callbackFunction) => {
  mongoose
    .model("applicationProcess")
    .findById(applicationProcessId, (err, result) => {
      let examId = result.exams.length + 1;
      callbackFunction(err, { examId: examId, applicationProcess: result });
    });
};

schema.methods.createInvitation = (email, callbackFunction) => {
  schema.methods.generateExamId(email, (err, result) => {
    let exam = { _id: result.examId, invitationStatus: "Sent" };
    mongoose
      .model("applicationProcess")
      .updateOne(
        { _id: result.applicationProcess._id },
        { $push: { exams: exam } },
        (err, r) => {
          r.data = {
            applicationProcessId: result.applicationProcess._id,
            email: result.applicationProcess.prospectiveStudent.email,
            examId: exam._id
          };
          callbackFunction(err, r);
        }
      );
  });
};

module.exports = mongoose.model("applicationProcess", schema);
