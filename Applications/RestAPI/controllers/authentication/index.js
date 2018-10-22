const crypto = require("crypto");
const mongoose = require("mongoose");
const { Subject } = require("rxjs");
const token = require("../../modules/token");

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
          data.data = { error: "Invalid User" };
          responser.next(data);
        } else {
          data.data = result;
          passwordVerifier.next(data);
        }
      }
    });
});

passwordVerifier.subscribe(data => {
  let cipher = crypto.createCipher(
    process.env.USER_PASSWORD_CRYPT_ALGO,
    process.env.USER_PASSWORD_CRYPT_PASSWD
  );
  let result = cipher.update(data.request.body.password, "utf8", "hex");
  result += cipher.final("hex");
  if (result == data.data.password) {
    data.next = responser;
    data.responser = responser;
    token.tokenGenerator.next(data);
  } else {
    data.data = { error: "Invalid User" };
    responser.next(data);
  }
});

responser.subscribe(data => {
  data.response.json(data.data);
});

module.exports.userRetriever = userRetriever;
module.exports.passwordVerifier = passwordVerifier;
module.exports.responser = responser;
