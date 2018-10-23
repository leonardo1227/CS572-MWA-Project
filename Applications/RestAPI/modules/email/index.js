const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWD }
});

const sendEmail = (receiver, subject, htmlbody, callbackFunction) => {
  let mailOptions = {
    from: `"AEL CSExam System" <${process.env.EMAIL_USER}>`,
    to: receiver,
    subject: subject,
    html: htmlbody
  };
  transporter.sendMail(mailOptions, (err, info) => {
    callbackFunction(err, info);
  });
};

module.exports.sendEmail = sendEmail;
