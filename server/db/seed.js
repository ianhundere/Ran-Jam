require('./config');
// Require models
const Song = require('../models/Song.js');

const song = new Song({
	sample: {
		url: 'http://www.freesound.org/data/previews/135/135472_1050391-lq.mp3',
		detune: 0
	}
});

song.save((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('song created');
	}
});
