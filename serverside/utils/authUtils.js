const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const userModel = require("../models/userModel");

const checkAdmin = async (username, teamId) => {
  try {
    const admin = await userModel.findOne({ username: username }).populate("teams.team");
    if (admin) {
      for (const team of admin.teams) {
        if (team.team._id.toString() === teamId && team.role === "admin") {
          return true;
        }
      }
    }
  } catch (error) {
    throw error;
  }
  return false;
};

const generateJwtToken = async (firstname, lastname, username, email) => {
  try {
    return await jwt.sign(
      {
        data: {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
        },
      },
      process.env.SECRET_TOKEN
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const forgotPasswordMail = async (firstname, lastname, email, username, resetPasswordToken) => {
  let otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.TEAMUP_EMAIL,
        pass: process.env.TEAMUP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.TEAMUP_EMAIL,
      to: email,
      subject: "Team Up Reset Password Otp",
      html:
        "<p>Dear " +
        firstname +
        " " +
        lastname +
        ",</p>" +
        "<p>We've received a request to reset your password.</p>" +
        "<p>If you didn't make the request, just ignore this message.</p>" +
        "<p>Your One Time Password (OTP):</p>" +
        `<strong>${otp}</strong>` +
        "<p>Please do not share this OTP with anyone else for your own privacy.</p>" +
        "</p>" +
        "<p>Thank you,</p>" +
        "<p> Team Up Team</p>",
    };
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const emailVerificationMail = async (firstname, lastname, email, username) => {
  let otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.TEAMUP_EMAIL,
        pass: process.env.TEAMUP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.TEAMUP_EMAIL,
      to: email,
      subject: "Team Up Email Verification",
      html:
        "<p>Dear " +
        firstname +
        " " +
        lastname +
        ",</p>" +
        "<p>Welcome to Team Up. We're glad to have you onboard.</p>" +
        "<p>Your One Time Password (OTP):</p>" +
        `<b>${otp}</b>` +
        "<p>Please do not share this OTP with anyone else for your own privacy.</p>" +
        "</p>" +
        "<p>Thank you,</p>" +
        "<p> Team Up Team</p>",
    };
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { checkAdmin, generateJwtToken, forgotPasswordMail, emailVerificationMail };
