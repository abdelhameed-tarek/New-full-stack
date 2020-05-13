const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Post req
// signup User or create a new user
// /api/users/signup

router.post(
  "/signup",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please enter is a valid email").isEmail(),
    check(
      "password",
      "Please enter is a valid password with min characters of 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, history, role } = req.body;

    try {
      // if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            { msg: "User is already exist, Please enter a valid email" },
          ],
        });
      }

      user = new User({
        name,
        email,
        password,
        history,
        role,
      });

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get("JWTSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
