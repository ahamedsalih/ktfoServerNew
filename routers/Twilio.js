const express = require("express");

const router = express.Router();

const Twilio = require("../models/twilio");

//
router.post("/twilio/auth", async (req, res) => {
  const { username, password, serviceId } = req.body;

  const twilioAuth = new Twilio({
    username,
    password,
    serviceId,
  });

  await twilioAuth
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ success: "Your twilio auth created successfully" });
    })
    .catch((err) => {
      console.log(err);

      return res
        .status(200)
        .json({ success: "Your twilio auth failed to create" });
    });
});

router.get("/getTwilioAuth", async (req, res) => {
  await Twilio.find({}, { _id: 0, __v: 0 })

    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.json({ error: "Something went wrong Please try again" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
