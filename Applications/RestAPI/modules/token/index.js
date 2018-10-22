const jwt = require("jsonwebtoken");
const { Subject } = require("rxjs");

const tokenGenerator = new Subject();
const tokenVerifier = new Subject();

tokenGenerator.subscribe(data => {
  let token = jwt.sign(
    JSON.stringify(data.data),
    process.env.TOKEN_PRIVATE_KEY
  );
  data.data = { token: token };
  data.next.next(data);
});

tokenVerifier.subscribe(data => {
  jwt.verify(
    data.request.token,
    process.env.TOKEN_PRIVATE_KEY,
    (err, result) => {
      if (err) {
        data.data = { error: "Invalid Token" };
        data.responser.next(data);
      } else {
        data.next.next(data);
      }
    }
  );
});

module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenVerifier = tokenVerifier;
