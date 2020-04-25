const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SnapSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	user_Id: {
		type: Schema.ObjectId,
	},

	createAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('snap', SnapSchema);
