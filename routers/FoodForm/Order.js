const express = require("express");
const moment = require("moment");

const router = express.Router();

const OrderFood = require("../../models/FoodForm/Order");

router.post("/submitOrder", async (req, res) => {
  const { orderItems, userId, type } = req.body;

  console.log("orderItems--->,", orderItems);
  console.log("userId---->", userId);

  const foodItems = await JSON.parse(orderItems);

  const order = new OrderFood({
    orderItems: foodItems,
    userId: userId,
    type: type,
  });

  order
    .save()
    .then((response) => {
      if (response) {
        return res.status(200).json({ success: "Your order has been taken" });
      } else {
        return res
          .status(200)
          .json({ failure: "Your order has been failed please try again" });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/getOrder", async (req, res) => {
  const { id } = req.body;

  console.log("id--->", req.body);

  OrderFood.find({ userId: id })
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.json({ error: "Something went wrong Please try again" });
      }
    })
    .catch((err) => console.log(err));
});

router.get("/getTodayOrder", async (req, res) => {
  const date = moment().format("L");

  console.log("date--->", date);

  OrderFood.find({ createdAt: { $gte: date } })
    .populate("userId")
    .then((result) => {
      if (result) {
        console.log("data--->", result.length);
        return res.status(200).json(result);
      } else {
        return res.json({ error: "Something went wrong Please try again" });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/getAllOrder", async (req, res) => {
  const { startDate, endDate } = req.body;

  console.log("start&end-->", startDate, endDate);

  OrderFood.find(
    { createdAt: { $gte: startDate, $lte: endDate } },
    { _id: 0, __v: 0 }
  )
    .then((result) => {
      if (result) {
        console.log("data--->", result.length);
        return res.status(200).json(result);
      } else {
        return res.json({ error: "Something went wrong Please try again" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
