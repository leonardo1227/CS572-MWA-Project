const nodemailer = require("nodemailer");
const applicationProcessDB = require("../../modules/dbconnection/models").applicationProcess();
const { Subject } = require("rxjs");
const encryptation = require("../../modules/encryptation");

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
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: { user: account.user, pass: account.pass }
    });

    let mailOptions = {
      // from: '"AEL CSES" <register@aelcses.com>',
      from: data.invitationInfo.email,
      to: data.invitationInfo.email,
      subject: "Exam Token URL Request",
      text: "localhost:1001/invitations/answer?cod=" + data.invitationInfo.hash,
      html: "<b>TESTE</b>"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      console.log(err);
      console.log(info);
      data.data = { sent: "ok" };
      responser.next(data);
    });
  });
});

responser.subscribe(data => {
  data.response.json(data.data);
});

// module.exports.invitationCreator = invitationCreator;
module.exports.examObjectCreator = examObjectCreator;
