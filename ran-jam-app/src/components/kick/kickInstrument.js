import Tone from 'tone';
import soundfile from './sounds/housedrop.wav';

var drumKick = new Tone.Player({
	url: soundfile
})
	.toMaster()
	.set({ volume: -10 });

let kickPattern = new Tone.Pattern(function(time) {
	drumKick.start(time);
}, '2n');

export { drumKick, kickPattern };
