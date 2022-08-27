const mongoose = require("mongoose");

const twilioAuth = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  serviceId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TwilioAuth", twilioAuth);
