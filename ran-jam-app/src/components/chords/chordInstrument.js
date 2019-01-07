import Tone from 'tone';
import chordList from './chordList';
import delay from '../fx/delay';

function randomIndex(array) {
	return Math.floor(Math.random() * array.length);
}

function randomChord(randomIndex) {
	var i = randomIndex(chordList);
	return chordList[i];
}

var chordSynth = new Tone.PolySynth(8, Tone.FMSynth).chain(delay);

chordSynth.set({
	envelope: {
		attack: 2,
		release: 10
	},
	volume: -20
});

var chordPattern = new Tone.Event(function(rate) {
	chordSynth.triggerAttackRelease(randomChord(randomIndex), '4n');
});

chordPattern.loop = true;

export { chordPattern, chordSynth };
