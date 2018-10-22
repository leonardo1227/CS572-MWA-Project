const crypto = require("crypto");

const crypter = data => {
  let cipher = crypto.createCipher(
    process.env.USER_PASSWORD_CRYPT_ALGO,
    process.env.USER_PASSWORD_CRYPT_PASSWD
  );
  let result = cipher.update(data, "utf8", "hex");
  result += cipher.final("hex");
  return result;
};

const decrypter = data => {
  let decipher = crypto.createDecipher(
    process.env.USER_PASSWORD_CRYPT_ALGO,
    process.env.USER_PASSWORD_CRYPT_PASSWD
  );
  let result = decipher.update(data, "hex", "utf8");
  result += decipher.final("utf8");
  return result;
};

module.exports.crypter = crypter;
module.exports.decrypter = decrypter;
