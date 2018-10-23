const applicationProcessDB = require("../../modules/dbconnection/models").applicationProcess();
const { Subject } = require("rxjs");
const encryptation = require("../../modules/encryptation");
const email = require("../../modules/email");

const invitationHashCreator = new Subject();
const examObjectCreator = new Subject();
const emailSender = new Subject();
const responser = new Subject();

examObjectCreator.subscribe(data => {
  applicationProcessDB.createInvitation(
    data.request.body.applicationProcessId,
    (err, result) => {
      if (err) {
        data.data = { error: "Error" };
        responser.next(data);
      } else {
        data.invitationInfo = result.data;
        invitationHashCreator.next(data);
      }
    }
  );
});

invitationHashCreator.subscribe(data => {
  let info =
    data.invitationInfo.email +
    "/" +
    data.invitationInfo.applicationProcessId +
    "/" +
    data.invitationInfo.examId;
  data.invitationInfo.hash = encryptation.crypter(info);
  emailSender.next(data);
});

emailSender.subscribe(data => {
  let htmlbody = `<h3>This is the invitation to take the exam, click in the following link:</h3>
              <a href="http://localhost:1001/invitations/answer?cod=${
                data.invitationInfo.hash
              }">Take the exam</a>`;

  email.sendEmail(
    data.invitationInfo.email,
    "Exam Token URL Request",
    htmlbody,
    (err, info) => {
      if (err) {
        data.data = { sent: "error" };
      } else {
        data.data = { sent: "sucess" };
      }
      responser.next(data);
    }
  );
});

responser.subscribe(data => {
  data.response.json(data.data);
});

module.exports.examObjectCreator = examObjectCreator;
