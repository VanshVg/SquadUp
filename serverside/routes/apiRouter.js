const express = require("express");

const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes");

const apiRouter = express.Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/teams", teamRoutes);

module.exports = apiRouter;
