var jwt = require('jsonwebtoken');

const token = (username, expiresIn = '1h') => {
	return jwt.sign(
		{
			username,
		},
		process.env.SECRET_KEY,
		{ expiresIn }
	);
};
module.exports = token;
