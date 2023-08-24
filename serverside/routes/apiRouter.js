const express = require("express");

const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes");
const taskRoutes = require("./taskRoutes");

const apiRouter = express.Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/teams", teamRoutes);
apiRouter.use("/tasks", taskRoutes);

module.exports = apiRouter;
