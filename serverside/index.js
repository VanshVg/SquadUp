const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const apiRouter = require("./routes/apiRouter");
require("./config/db");

const app = express();

app.use(express.json());
app.use(cookieParser());
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log(
  "CORS Configuration:",
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

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
