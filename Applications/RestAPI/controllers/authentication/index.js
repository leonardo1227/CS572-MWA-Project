const mongoose = require("mongoose");
const { Subject } = require("rxjs");
const token = require("../../modules/token");
const encryptation = require("../../modules/encryptation");

const userRetriever = new Subject();
const passwordVerifier = new Subject();
const responser = new Subject();

userRetriever.subscribe(data => {
  mongoose
    .model("user")
    .findOne({ email: data.request.body.email }, (err, result) => {
      if (err) {
        data.data = err;
        responser.next(data);
      } else {
        if (result == null || !result.actived) {
          data.data = { error: "Invalid credentials" };
          responser.next(data);
        } else {
          data.data = result;
          passwordVerifier.next(data);
        }
      }
    });
});

passwordVerifier.subscribe(data => {
  let result = encryptation.crypter(data.request.body.password);
  if (result == data.data.password) {
    data.next = responser;
    data.responser = responser;
    token.tokenGenerator.next(data);
  } else {
    data.data = { error: "Invalid credentials" };
    responser.next(data);
  }
});

responser.subscribe(data => {
  data.response.json(data.data);
});

module.exports.userRetriever = userRetriever;
module.exports.passwordVerifier = passwordVerifier;
module.exports.responser = responser;
