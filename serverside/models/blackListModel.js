const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  type: {
    type: String,
    default: "userToken",
  },
  blackList: [{ type: String }],
});

module.exports = mongoose.model("blacklists", blacklistSchema);
