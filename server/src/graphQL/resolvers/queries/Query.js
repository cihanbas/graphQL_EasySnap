const Query = {
	user: async (parent, args, { User }) => {
		return await User.findById(args.id);
	},

	users: async (parent, args, { User }) => {
		return await User.find({});
	},
	snap: async (parent, args, { Snap }) => {
		return await Snap.findById(args.id);
	},
	snaps: async (parent, args, { Snap }) => {
		return await Snap.find({});
	},
	activeUser: async (parent, args, { User, activeUser }) => {
		if (activeUser) {
			return await User.findOne({ username: activeUser.username });
		} else return null;
	},
};
module.exports = Query;
