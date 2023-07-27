const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Error connecting mongodb", error);
});

db.once("open", () => {
  console.log("Mongodb is connected");
});

db.on("disconnected", () => {
  console.log("Mongodb is disconnected");
});

module.exports = db;
