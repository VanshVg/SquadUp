const jwt = require("jsonwebtoken");
require("dotenv").config();

let isAuthenticated = async (req, res, next) => {
  const { userToken } = req.cookies;
  console.log(req.cookies);
  if (!userToken) {
    return res.status(403).send({
      message: "Login Required",
    });
  }
  try {
    let decoded = await jwt.verify(userToken, process.env.SECRET_TOKEN);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({
        message: "Invalid Token",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = isAuthenticated;
