const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();

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
                {
                  data: {
                    username: username,
                    email: email,
                  },
                },
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
        message: "Error while registering",
        error: error,
      });
    }
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!password || (!email && !username)) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  try {
    if (username) {
      var user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(404).send({
          message: "User doesn't found",
        });
      }
    } else if (email) {
      user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).send({
          message: "User doesn't found",
        });
      }
    }

    let result = await bcrypt.compare(password, user.password);
    if (result === true) {
      try {
        const token = await jwt.sign(
          {
            data: {
              username: user.username,
              email: user.email,
            },
          },
          process.env.SECRET_TOKEN
        );
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          })
          .send({
            message: "Login successful",
          });
      } catch (error) {
        res.status(500).send({
          message: "Jwt Error",
          error: error,
        });
      }
    } else {
      res.status(404).send({
        message: "Wrong password",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error while logging",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .send({
      message: "Logout Successful",
    });
};

const userProfile = async (req, res) => {
  const { username, email } = req.user.data;
  res.status(200).send({
    Username: username,
    Email: email,
  });
};

const updateProfile = async (req, res) => {
  const { username, email } = req.user.data;
  const { newUserName, newEmail } = req.body;
  if (!newUserName && !newEmail) {
    return res.status(400).send({
      message: "Atleast one field is required",
    });
  }
  try {
    if (newUserName) {
      let userData = await userModel.findOne({ username: newUserName });
      if (userData) {
        return res.status(400).send({
          message: "Username has already been taken",
        });
      }
    }
    if (newEmail) {
      let userData = await userModel.findOne({ email: newEmail });
      if (userData) {
        return res.status(400).send({
          message: "User with this email already exists",
        });
      }
    }
    if (newUserName) {
      await userModel.updateOne(
        { username: username },
        { $set: { username: newUserName } }
      );
      var newUserData = await userModel.findOne({ username: newUserName });
    }
    if (newEmail) {
      await userModel.updateOne(
        { email: email },
        { $set: { email: newEmail } }
      );
      newUserData = await userModel.findOne({ email: newEmail });
    }
    const token = await jwt.sign(
      {
        data: {
          username: newUserData.username,
          email: newUserData.email,
        },
      },
      process.env.SECRET_TOKEN
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
      })
      .send({
        message: "User data updated successfully",
      });
  } catch (error) {
    res.status(500).send({
      message: "Error while updating the profile",
      error: error,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { username } = req.user.data;
  try {
    await userModel.deleteOne({ username: username });
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
      })
      .send({
        message: "User deleted successfully",
      });
  } catch (error) {
    res.status(500).send({
      message: "Error while deleting user",
      error: error,
    });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { username } = req.user.data;
  if (!oldPassword || !newPassword) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }
  try {
    const user = await userModel.findOne({ username: username });
    let result = await bcrypt.compare(oldPassword, user.password);
    if (result === true) {
      const hash = await bcrypt.hash(newPassword, 10);
      await userModel.updateOne(
        { username: username },
        { $set: { password: hash } }
      );
      return res.status(200).send({
        message: "Password updated successfully",
      });
    }
    return res.status(400).send({
      message: "Wrong password",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while updating password",
      error: error,
    });
  }
};

const forgotPasswordMail = async (email, username, resetPasswordToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.TASKFLOW_EMAIL,
        pass: process.env.TASKFLOW_PASS,
      },
    });

    const mailOptions = {
      from: process.env.TASKFLOW_EMAIL,
      to: email,
      subject: "Task Flow Password Reset",
      html:
        "<p>Dear " +
        username +
        ",</p>" +
        "<p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>" +
        "<p>To reset your password, please click on the following link:</p>" +
        '<p><a href="http://localhost:3001/api/users/reset-password?token=' +
        resetPasswordToken +
        '">Reset Password</a></p>' +
        "<p>If the link above doesn't work, copy and paste the following URL into your browser:</p>" +
        "<p>http://localhost:3001/api/users/reset-password?token=" +
        resetPasswordToken +
        "</p>" +
        "<p>Thank you,</p>" +
        "<p> Task Flow Team</p>",
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Mail has been sent:", info.response);
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email, username } = req.user.data;
  try {
    let user = await userModel.findOne({ email: email });
    const resetPasswordToken = randomstring.generate();
    await userModel.updateOne(
      { email: email },
      { $set: { resetPasswordToken: resetPasswordToken } }
    );
    forgotPasswordMail(email, username, resetPasswordToken);
    res.status(200).send({
      message: "Please check your email inbox",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while processing forgot password request",
      error: error,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  userProfile,
  updateProfile,
  deleteAccount,
  updatePassword,
  forgotPassword,
};
