const express = require("express");
require("dotenv").config();

require("./config/db");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
