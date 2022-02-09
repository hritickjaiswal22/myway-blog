const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    bcrypt
      .hash(req.body.password, 10)
      .then(async function (hash) {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phoneNumber: req.body.phoneNumber,
        });

        const user = await newUser.save();

        const accessToken = await JWT.sign(
          { email: req.body.email, id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "3600s",
          }
        );

        res.status(200).json({ accessToken });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(400).json("Check email and password");

    const match = await bcrypt.compare(req.body.password, user.password);

    !match && res.status(400).json("Check email and password");

    const accessToken = await JWT.sign(
      { email: req.body.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600s",
      }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    console.log(token);

    if (!token) return res.json(false);

    const verified = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);

    if (!user) return res.json(false);

    return res.json({
      val: true,
      userId: String(user._id),
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
