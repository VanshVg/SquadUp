const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const apiRouter = require("./routes/apiRouter");
require("./config/db");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: "Internal server error",
  });
});
