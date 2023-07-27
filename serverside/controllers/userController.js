const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({
      message: "All fields are required",
    });
  } else {
    try {
      const userName = await userModel.findOne({ username: username });
      const userEmail = await userModel.findOne({ email: email });
      if (userName) {
        res.status(400).send({
          message: "Username has already been taken",
        });
      } else {
        if (userEmail) {
          res.status(400).send({
            message: "User with this email already exists",
          });
        } else {
          const hash = await bcrypt.hash(password, 10);
          const data = new userModel({
            username: username,
            email: email,
            password: hash,
          });
          let results = await data.save();
          if (!results) {
            res.status(500).send({
              message: "User registration failed",
            });
          } else {
            try {
              jwt.sign(
                { data: results },
                process.env.SECRET_TOKEN,
                (error, token) => {
                  if (error) {
                    throw error;
                  } else {
                    res
                      .status(200)
                      .cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 60 * 60 * 1000,
                      })
                      .send({
                        message: "User registered successfully",
                      });
                  }
                }
              );
            } catch (error) {
              res.status(500).send({
                message: "Jwt token error in registration",
                error: error,
              });
            }
          }
        }
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
        error: error,
      });
    }
  }
};

module.exports = { register };
