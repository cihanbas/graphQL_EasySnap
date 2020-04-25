const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const resolvers = require('./src/graphQL/resolvers');

mongoose
	.connect(process.env.DB_URI, { useUnifiedTopology: true })
	.then(() => console.log('connected'))
	.catch((err) => console.log('failed', err));

//Models
const User = require('./src/models/User');
const Snap = require('./src/models/Snap');
const server = new ApolloServer({
	resolvers,
	typeDefs: importSchema('./src/graphQL/schema.graphql'),
	context: ({ req }) => ({ User, Snap, activeUser: req.activeUser }),
});
const app = express();
app.use(async (req, res, next) => {
	const token = req.headers['authorization'];
	if (token && token !== 'null') {
		try {
			const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
			req.activeUser = activeUser;
			console.log('activeUser', activeUser);
		} catch (error) {
			console.log('token Error', error);
		}
		console.log('token', token);
	}
	next();
});
server.applyMiddleware({ app });
app.listen({ port: 3000 }, () => {
	console.log('connection server listening on port 3000');
});
