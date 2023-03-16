const router = require("express").Router();
const Profile = require("../../models/Profile.js");
const { signToken } = require("../../utils/auth.js");

// POST /api/users is a registration route for creating a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await Profile.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //create a jwt, and send back to FE
    const token = signToken(newUser); //breaking here
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log('error1', err);
    res.status(500).json({ success: false, token: null });
  }
});

// POST /api/users/login is a login route for an existing user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      // res.status(400).json({ message: 'No user account found!' });
      res.redirect("/game");
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      // res.status(400).json({ message: 'No user account found!' });
      res.redirect("/game");
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.redirect("/game");
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
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
