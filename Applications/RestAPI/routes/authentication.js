const express = require("express");
const route = express.Router();
route.use(express.json());
require("dotenv").config();
const crypto = require("crypto");
const mongoose = require("mongoose");
const { Subject } = require("rxjs");
const jwt = require("jsonwebtoken");

const userRetriever = new Subject();
const passwordVerifier = new Subject();
const tokenGenerator = new Subject();
const tokenVerifier = new Subject();
const responser = new Subject();

route.post("/", (request, response) => {
  let data = { request: request, response: response };
  userRetriever.next(data);
});

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
    tokenGenerator.next(data);
  } else {
    data.data = { error: "Invalid User" };
    responser.next(data);
  }
});

tokenGenerator.subscribe(data => {
  let token = jwt.sign(
    JSON.stringify(data.data),
    process.env.TOKEN_PRIVATE_KEY
  );
  data.data = { token: token };
  data.response.json(data.data);
});

tokenVerifier.subscribe(data => {
  jwt.verify(
    data.request.token,
    process.env.TOKEN_PRIVATE_KEY,
    (err, result) => {
      if (err) {
        data.data = { error: "Invalid Token" };
        responser.next(data);
      } else {
        data.protectedResource.next(data);
      }
    }
  );
});

responser.subscribe(data => {
  data.response.json(data.data);
});

module.exports = route;
