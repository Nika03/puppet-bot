const { mongoose } = require("mongoose");

const Cases = new mongoose.Schema({
  punished: `String`,
  punisher: `String`,
  type: `String`,
  reason: `String`,
  time: `Number`,
  expired: `Boolean`,
  pardoner: `String`,
  case: `Number`,
  staff_who_expired: "String",
  reason_for_expire: "String",
});

const CasesModel = mongoose.model("Cases", Cases);

module.exports = CasesModel;
