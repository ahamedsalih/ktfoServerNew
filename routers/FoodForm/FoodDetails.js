const express = require("express");

const router = express.Router();

const FoodDetails = require("../../models/FoodForm/FoodDetails");

//ALL FOOD DETAILS POST API
router.post("/foodDetailsPost", (req, res) => {
  const { dinnerItems, breakFastItems } = req.body;

  const foods = new FoodDetails({
    dinnerItems,
    breakFastItems,
  });

  foods
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ success: "Your food details created successfully" });
    })
    .catch((err) => {
      console.log(err);

      return res
        .status(200)
        .json({ success: "Your food details failed to create" });
    });
});

//ALL FOOD DETAILS GET API
router.get("/getFoodDetails", (req, res) => {
  FoodDetails.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
