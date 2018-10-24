const mongoose = require("mongoose");
const snapshotModel = require("../models/snapshot");

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

schema.methods.createInvitation = (proccessApplicationId, callbackFunction) => {
  schema.methods.generateExamId(proccessApplicationId, (err, result) => {
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

schema.methods.getExam = (proccessApplicationId, examId, callbackFunction) => {
  mongoose
    .model("applicationProcess")
    .findById(proccessApplicationId, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        callbackFunction(res.exams.find(e => e._id == examId));
      }
    });
};

schema.methods.updateExam = (proccessApplicationId, exam, callbackFunction) => {
  mongoose
    .model("applicationProcess")
    .updateOne(
      { _id: proccessApplicationId, "exams._id": exam._id },
      { $set: { "exams.$": exam } },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callbackFunction(result);
        }
      }
    );
};

schema.methods.getApplicationProcessesToInvite = callbackFunction => {
  let query = {};
  mongoose.model("applicationProcess").find(query, (err, result) => {
    callbackFunction(err, result);
  });
};

module.exports = mongoose.model("applicationProcess", schema);
