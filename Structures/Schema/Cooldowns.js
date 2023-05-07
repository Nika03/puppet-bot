const { mongoose } = require("mongoose");

const Cases = new mongoose.Schema({
	Guild: "String",
	reggie_cooldown: { type: "Number", default: 0 },
});

const CasesModel = mongoose.model("CoolDowns", Cases);

module.exports = CasesModel;
