const Snap = {
	user: async (parent, args, { User }) => {
		console.log('parent', parent);
		return await User.findById(parent.user_Id);
	},
};
module.exports = Snap;
