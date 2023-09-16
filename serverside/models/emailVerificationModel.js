const mongoose = require("mongoose");

const emailVerificationSchema = mongoose.Schema({
  verificationID: {
    type: String,
    required: true,
  },
  verificationEmail: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("verificationdatas", emailVerificationSchema);
