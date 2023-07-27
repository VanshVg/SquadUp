const express = require("express");

const userRoutes = require("./userRoutes");

const apiRouter = express.Router();

apiRouter.use("/users", userRoutes);

module.exports = apiRouter;
