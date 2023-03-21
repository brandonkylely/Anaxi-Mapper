const router = require("express").Router();
const User = require("../../models/User.js");
const { signToken } = require("../../utils/auth.js");
const auth = require("../../middleware/auth");

// POST /api/users is a registration route for creating a new user
router.post("/", async (req, res) => {
  try {
    console.log("signup req.body", req.body);
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log("newUser", newUser);
    console.log("newUser password", newUser.password);
    //create a jwt, and send back to FE
    const token = signToken(newUser);
    userId = newUser._id;
    res.status(200).json({ success: true, token, userId });
  } catch (err) {
    console.log("error1", err);
    res.status(500).json({ success: false, token: null });
  }
});

// POST /api/users/login is a login route for an existing user
router.post("/login", async (req, res) => {
  console.log("hit the login route!!!!", req.body);
  let userFound = true;
  try {
    const signUser = await User.findOne({ userName: req.body.userName });

    console.log("found user!", signUser);
    console.log("signUser", signUser);
    if (signUser === null) {
      console.log("user was null");
      userFound = false;
      res.status(500).json({
        success: false,
        token: null,
        message: "No user account found!",
        userId: null,
      });
      return;
    }

    // const validPassword = user.checkPassword(req.body.password);
    console.log("userFound", userFound);
    if (userFound) {
      const validPassword = signUser.isCorrectPassword(req.body.password);
      if (!validPassword) {
        console.log("password was false");
        res.status(500).json({
          success: false,
          token: null,
          message: "Incorrect password!",
          userId: null,
        });
        return;
      }

      const token = signToken(signUser);
      res.status(200).json({ success: true, token, userId: signUser._id });
    }

    // req.session.save(() => {
    //   req.session.userId = user.id;
    //   req.session.username = user.username;
    //   req.session.loggedIn = true;

    //   res.redirect("/game");
    // });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Username not found!" });
  }
});

// POST /api/users/logout is a logout route for an existing user,
//it also destroys the session so the user is no longer logged in
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
