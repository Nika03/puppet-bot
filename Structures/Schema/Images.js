const { mongoose } = require("mongoose");

const img = new mongoose.Schema({
  images: "Array",
});

const imgC = mongoose.model("img", img);

module.exports = imgC;
