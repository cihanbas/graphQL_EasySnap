module.exports = {
	createSnap: async (parent, { data: { user_Id, text } }, { Snap }) => {
		console.log('user_id', user_Id);
		return Snap({ user_Id, text }).save();
	},
	deleteSnap: async (parent, { data: { id } }, { Snap }) => {
		console.log('mutation snap id', id);
		await Snap.deleteOne({ _id: id });
		return { id };
	},
};
//6213514
