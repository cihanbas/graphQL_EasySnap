const token = require('../../helpers/token');
module.exports = {
	createUser: async (parent, { data: { username, password } }, { User }) => {
		const user = await User.findOne({ username });
		if (user) {
			throw new Error('User already exists');
		}
		const userSave = await User({ username, password }).save();
		if (userSave) {
			return { token: token(username, '2h') };
		} else {
			throw new Error('We have an Error!!!');
		}
	},
	signIn: async (parent, { data: { username, password } }, { User }) => {
		const user = await User.findOne({ username });
		if (user) {
			if (password === user.password) {
				return { token: token(username, '2h') };
			} else {
				throw new Error("Password  doesn't correct!!!");
			}
		}
		if (!user) {
			throw new Error("User doesn't exists!!!");
		}
	},
};
