const mongoose = require("mongoose");

const orderFood = new mongoose.Schema(
  {
    orderItems: [],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAuth",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderFood", orderFood);
