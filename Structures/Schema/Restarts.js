const { mongoose } = require("mongoose");

const AllRestarts = new mongoose.Schema({
	GuildId: "Number",
	restarts: "Number",
	allguilds: "Array",
	pages: `Number`,
	id: `Number`,
	cases: `Number`,
	verification: "Boolean",
	imageFilter: "Boolean",
	button_presses: "Number",
});

const RestartsModel = mongoose.model("AllRestarts", AllRestarts);

module.exports = RestartsModel;
