const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { Subject } = require("rxjs");

const invitationCreator = new Subject();
const applicationProcessRetriver = new Subject();

applicationProcessRetriver.subscribe(data => {
  mongoose
    .model("applicationProcess")
    .find(
      { prospectiveStudent: { email: data.request.body.email } },
      (err, result) => {
        ///////////////
      }
    );
});

module.exports.invitationCreator = invitationCreator;
module.exports.applicationProcessRetriver = applicationProcessRetriver;
