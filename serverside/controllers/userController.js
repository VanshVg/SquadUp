const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();

const userModel = require("../models/userModel");
const { generateJwtToken } = require("../utils/authUtils");
const blackListModel = require("../models/blackListModel");

var cookieAge = 30 * 24 * 60 * 60 * 1000;

const register = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    res.status(400).json({
      type: "fields",
      message: "All fields are required",
    });
  } else {
    try {
      const userName = await userModel.findOne({
        username: { $regex: new RegExp(`^${username}$`, "i") },
      });
      const userEmail = await userModel.findOne({ email: email });
      if (userName) {
        res.status(409).json({
          type: "username",
          message: "Username has already been taken",
        });
      } else {
        if (userEmail) {
          res.status(409).json({
            type: "email",
            message: "User with this email already exists",
          });
        } else {
          const hash = await bcrypt.hash(password, 10);
          const data = new userModel({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hash,
          });
          let results = await data.save();
          if (!results) {
            res.status(500).json({
              type: "unknown",
              message: "User registration failed",
            });
          } else {
            try {
              let token = await generateJwtToken(firstname, lastname, username, email);
              res
                .status(200)
                .cookie("userToken", token, {
                  httpOnly: true,
                  maxAge: cookieAge,
                  sameSite: "none",
                  secure: true,
                })
                .json({
                  isLoggedIn: true,
                  userToken: token,
                  message: "User registered successfully",
                });
            } catch (error) {
              res.status(500).json({
                type: "jwt",
                message: "Jwt token error in registration",
                error: error,
              });
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        type: "unknown",
        message: "Error while registering",
        error: error,
      });
    }
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!password || (!email && !username)) {
    return res.status(400).json({
      type: "field",
      message: "All fields are required",
    });
  }

  try {
    let user;
    if (username) {
      user = await userModel.findOne({
        username: { $regex: new RegExp(`^${username}$`, "i") },
      });
    } else if (email) {
      user = await userModel.findOne({ email: email });
    }

    if (!user) {
      return res.status(404).json({
        type: "not_found",
        message: "User not found",
      });
    }

    let result = await bcrypt.compare(password, user.password);
    if (result === true) {
      try {
        let token = await generateJwtToken(
          user.firstname,
          user.lastname,
          user.username,
          user.email
        );
        res
          .status(200)
          .cookie("userToken", token, {
            httpOnly: true,
            maxAge: cookieAge,
            sameSite: "none",
            secure: true,
          })
          .json({
            isLoggedIn: true,
            userToken: token,
            message: "Login successful",
          });
      } catch (error) {
        res.status(500).json({
          type: "jwt",
          message: "Jwt Error",
          error: error,
        });
      }
    } else {
      res.status(404).json({
        type: "password",
        message: "Wrong password",
      });
    }
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while logging",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  const { userToken } = req.cookies;

  try {
    let userTokenBlackList = await blackListModel.findOne({ type: "userToken" });
    if (!userTokenBlackList) {
      let data = new blackListModel({
        type: "userToken",
        userToken: [],
      });
      userTokenBlackList = data;
    }

    userTokenBlackList.blackList.push(userToken);
    await userTokenBlackList.save();

    res
      .status(200)
      .cookie("userToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
      })
      .json({
        isLoggedIn: false,
        message: "Logout Successful",
      });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while logging Out",
      error: error,
    });
  }
};

const userProfile = async (req, res) => {
  const { firstname, lastname, username, email } = req.user.data;
  res.status(200).json({
    firstname: firstname,
    lastname: lastname,
    Username: username,
    Email: email,
  });
};

const updateProfile = async (req, res) => {
  const { username, email } = req.user.data;
  const { newUserName, newEmail } = req.body;
  if (!newUserName && !newEmail) {
    return res.status(400).json({
      type: "field",
      message: "Atleast one field is required",
    });
  }

  try {
    if (newUserName) {
      if (newUserName.toLowerCase() === username.toLowerCase()) {
        return res.status(400).send({
          type: "username",
          message: "Please choose different username from your current username",
        });
      }
      let userData = await userModel.findOne({ username: newUserName });
      if (userData) {
        return res.status(409).json({
          type: "username",
          message: "Username has already been taken",
        });
      }
    }
    if (newEmail) {
      if (newEmail === email) {
        return res.status(400).send({
          type: "email",
          message: "Please choose different email from your current email",
        });
      }
      let userData = await userModel.findOne({ email: newEmail });
      if (userData) {
        return res.status(409).json({
          type: "email",
          message: "User with this email already exists",
        });
      }
    }
    if (newUserName) {
      await userModel.updateOne({ username: username }, { $set: { username: newUserName } });
      var newUserData = await userModel.findOne({ username: newUserName });
    }
    if (newEmail) {
      await userModel.updateOne({ email: email }, { $set: { email: newEmail } });
      newUserData = await userModel.findOne({ email: newEmail });
    }
    const token = await generateJwtToken(
      newUserData.firstname,
      newUserData.lastname,
      newUserData.username,
      newUserData.email
    );
    res
      .status(200)
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: cookieAge,
      })
      .json({
        message: "User data updated successfully",
      });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
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
      .cookie("userToken", "", {
        httpOnly: true,
        secure: true,
        maxAge: new Date(Date.now()),
      })
      .json({
        message: "User deleted successfully",
      });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while deleting user",
      error: error,
    });
  }
};

const forgotPasswordMail = async (firstname, lastname, email, username, resetPasswordToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.TEAMUP,
        pass: process.env.TEAMUP,
      },
    });

    const mailOptions = {
      from: process.env.TEAMUP,
      to: email,
      subject: "Team Up Password Reset",
      html:
        "<p>Dear " +
        firstname +
        " " +
        lastname +
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
        "<p> Team Up Team</p>",
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Mail has been sent:", info.response);
    await userModel.updateOne({ username: username }, { $unset: { resetPasswordToken: 1 } });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { firstname, lastname, email, username } = req.user.data;
  try {
    const resetPasswordToken = randomstring.generate();
    await userModel.updateOne(
      { email: email },
      { $set: { resetPasswordToken: resetPasswordToken } }
    );
    try {
      await forgotPasswordMail(firstname, lastname, email, username, resetPasswordToken);
      res.status(200).json({
        message: "Please check your email inbox",
      });
    } catch (error) {
      return res.status(500).json({
        type: "unknown",
        message: "Failed to send password reset email",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while processing forgot password request",
      error: error,
    });
  }
};

const verifyPassword = async (req, res) => {
  const { oldPassword } = req.body;
  const { username } = req.user.data;
  if (!oldPassword) {
    return res.status(400).json({
      type: "field",
      message: "All fields are required",
    });
  }
  try {
    let user = await userModel.findOne({ username: username });
    let result = await bcrypt.compare(oldPassword, user.password);
    if (result === true) {
      return res.status(200).json({
        message: "Password is correct",
      });
    }
    res.status(401).json({
      type: "password",
      message: "Password is incorrect",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while verifying the password",
      error: error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { username } = req.user.data;
  if (!newPassword) {
    return res.status(400).json({
      type: "field",
      message: "All fields are required",
    });
  }
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await userModel.updateOne({ username: username }, { $set: { password: hash } });
    res.status(200).json({
      message: "Password has been changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      type: "unknown",
      message: "Error while reseting a password",
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
  forgotPassword,
  verifyPassword,
  resetPassword,
};
