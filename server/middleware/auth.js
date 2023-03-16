// const { User } = require("../models/User");
const { decode } = require("../utils/auth");

let auth = (req, res, next) => {
  console.log('req.headers.authorization', req.headers)
  if (!req.headers.authorization) {
    return next();
  }

  if (req.headers.authorization === "Bearer null") {
    return next();
  }
  const token = req.headers.authorization.replace("Bearer ", "");

  console.log("YOUR TOKEN IS HERE", token);
  //TODO, validate token using the auth.js in utils, add user info to req
  const decodedToken = decode(token);
  
  console.log('decodedToken', decodedToken)
  //if valid, assign decodedToken.data to req.user, so all api routes have access to req.user, otherwise set to null
  //on protected routes, if no user is attached to the req, don't let hit route
  req.user = decodedToken?.data || null
  next();
};

module.exports = { auth };
