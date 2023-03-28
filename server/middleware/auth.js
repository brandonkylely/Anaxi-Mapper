// const { User } = require("../models/User");
const { decode } = require("../utils/auth");

let auth = (req, res, next) => {
  // console.log('req.headers.authorization', req.headers)
  if (!req.headers.authorization) {
    console.log("no authorization header")
    return next();
  }

  if (req.headers.authorization === "Bearer null") {
    console.log("Bearer null")
    return next();
  }
  
  const token = req.headers.authorization.replace("Bearer ", "");

  // console.log("YOUR TOKEN IS HERE", token);
  //TODO, validate token using the auth.js in utils, add user info to req
  const decodedToken = decode(token);
  console.log("decodedToken", decodedToken);
  // console.log('decodedToken', decodedToken)
  //if valid, assign decodedToken.data to req.user, so all api routes have access to req.user, otherwise set to null
  //on protected routes, if no user is attached to the req, don't let hit route
  req.user = decodedToken?.data || null
  
  console.log("made it to end of auth.js")
  next();
};
// add additional auth utilities
// ask chad why destructured
module.exports = auth;
