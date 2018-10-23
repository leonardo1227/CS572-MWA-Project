const jwt = require("jsonwebtoken");
const { Subject } = require("rxjs");

const tokenGenerator = new Subject();
const passwordlessTokenGenerator = new Subject();

tokenGenerator.subscribe(data => {
  let token = jwt.sign(
    JSON.stringify(data.data),
    process.env.TOKEN_PRIVATE_KEY
  );
  data.data = {
    token: token,
    user: { name: data.data.name, email: data.data.email, role: data.data.role }
  };
  data.next.next(data);
});

passwordlessTokenGenerator.subscribe(data => {
  let d = {
    applicationProcessId: data.invitationInfo.applicationProcessId,
    examId: data.invitationInfo.examId,
    email: data.invitationInfo.email
  };
  let token = jwt.sign(d, process.env.TOKEN_PRIVATE_KEY);
  data.data = {
    token: token,
    applicationProcess: d
  };
  data.next.next(data);
});

const protectedResource = (request, response, next) => {
  ensureToken(request, response, next);
};

const ensureToken = (request, response, next) => {
  let bearerHeader = request.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    request.token = bearerHeader.split(" ")[1];
    verifyToken(request, response, next); //next
  } else {
    response.json({ token: "no token" });
  }
};

const verifyToken = (request, response, next) => {
  jwt.verify(request.token, process.env.TOKEN_PRIVATE_KEY, (err, result) => {
    if (err) {
      response.json({ token: "invalid" });
    } else {
      next();
    }
  });
};

module.exports.tokenGenerator = tokenGenerator;
module.exports.passwordlessTokenGenerator = passwordlessTokenGenerator;
module.exports.ensureToken = ensureToken;
module.exports.protectedResource = protectedResource;
module.exports.verifyToken = verifyToken;
