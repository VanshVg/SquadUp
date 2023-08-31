const express = require("express");

const userRoutes = require("./userRoutes");
const teamRoutes = require("./teamRoutes");
const taskRoutes = require("./taskRoutes");

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

apiRouter.use("/users", userRoutes);
apiRouter.use("/teams", teamRoutes);
apiRouter.use("/tasks", taskRoutes);

module.exports = apiRouter;
