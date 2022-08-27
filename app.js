const express = require("express");

const app = express();

const PORT = process.env.PORT || 7000;

const mongoose = require("mongoose");

const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

//ENV
require("dotenv").config();

//MONGO_DB Connection
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db disconnected", err);
  });

//For JSON data send
app.use(express.json());

//ALL ROUTERS

app.use(require("./routers/AuthRouter/Auth"));
app.use(require("./routers/FoodForm/FoodDetails"));
app.use(require("./routers/FoodForm/Order"));
app.use(require("./routers/Twilio"));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
