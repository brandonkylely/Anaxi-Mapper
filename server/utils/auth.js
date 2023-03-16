const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ email, name }) {
    const payload = { email, name };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  decode: (token) => jwt.verify(token, secret),
};
