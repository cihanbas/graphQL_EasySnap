const User = {
	snaps: async (parent, args, { Snap }) => {
		console.log('parent', parent.id);
		return await Snap.find({ user_Id: parent.id });
	},
};
module.exports = User;
