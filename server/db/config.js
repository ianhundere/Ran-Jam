const mongoose = require('mongoose');
mongoose.Promise = Promise;

const url = process.env.MONGODB_URI || 'mongodb://localhost/ran-jam';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log(`Mongoose connected to: ${url}`);
});

module.exports = mongoose;
