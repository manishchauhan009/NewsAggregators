const mongoose = require("mongoose");

const newsDataSchema = new mongoose.Schema({
  Group: String,
  Owner: String, // Assuming 'userData' is the name of your user model
  Date: { type: String, default: () => new Date().toISOString().split("T")[0] },
  Title: String,
  Content: String,
  imgUrl: String,
  Like: Number,
  Reported: Number,
  Approved: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("newsData", newsDataSchema);
