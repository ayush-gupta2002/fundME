const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("./verifyToken");

//REGISTER

router.post("/register", async (req, res) => {
  const { email, username, password, isAdmin } = req.body;
  const newUser = new User(req.body);
  try {
    const registeredUser = await User.register(newUser, password);
    res.send(registeredUser);
  } catch (err) {
    res.send(err);
  }
});

//LOGIN

router.post("/login", passport.authenticate("local"), async (req, res) => {
  const accessToken = jwt.sign(
    { id: req.user.id, isAdmin: req.user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
  console.log(accessToken);
  let loggedInUser = { ...req.user, accessToken };

  res.status(200).json(loggedInUser);
});

//LOGOUT

router.get("/logout", verifyToken, async (req, res) => {
  console.log("Before logging out", req.user);
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return res.status(400).json({ error: true });
      }
    });
    console.log("After logging out", req.user);
    return res.status(201).json({ success: true });
  }
});

module.exports = router;
