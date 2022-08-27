const mongoose = require("mongoose");

const foodDetails = new mongoose.Schema(
  {
    dinnerItems: [],
    breakFastItems: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodDetails", foodDetails);
