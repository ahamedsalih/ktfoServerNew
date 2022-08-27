const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const UserAuth = require("../../models/Auth/Authentication");

router.get("/KT", (req, res) => {
  res.send("home KT");
});

router.post("/signup", (req, res) => {
  const { name, phoneNumber } = req.body;

  console.log("name,phone-->", name, phoneNumber);

  UserAuth.findOne({ phoneNumber })
    .then((result) => {
      if (!result) {
        const newUser = new UserAuth({
          name: name,
          phoneNumber: phoneNumber,
        });

        newUser.save().then((savedUser) => {
          console.log("savedUser----", savedUser);
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, phoneNumber, isAdmin } = savedUser;

          return res
            .status(200)
            .json({ token, user: { _id, name, phoneNumber, isAdmin } });
        });
      } else {
        return res.json({
          already: "Your mobile number was already registered",
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/signin", (req, res) => {
  const { phoneNumber } = req.body;

  UserAuth.findOne({ phoneNumber: phoneNumber })
    .then((result) => {
      if (!result) {
        return res.json({ error: "Your phone number was not registered yet" });
      } else {
        const token = jwt.sign({ _id: result._id }, JWT_SECRET);
        const { _id, name, phoneNumber, isAdmin } = result;
        return res
          .status(200)
          .json({ token, user: { _id, name, phoneNumber, isAdmin } });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/checkphonenumber", (req, res) => {
  const { phoneNumber } = req.body;

  // console.log("phone-->", phoneNumber);

  UserAuth.findOne({ phoneNumber }).then((result) => {
    if (result) {
      return res.json({ already: "this phone number already exists" });
    } else {
      return res.json({ new: "new phone number" });
    }
  });
});

module.exports = router;
