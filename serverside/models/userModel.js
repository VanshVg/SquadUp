const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  teams: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
      },
      role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
      },
    },
  ],
  resetPasswordToken: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
