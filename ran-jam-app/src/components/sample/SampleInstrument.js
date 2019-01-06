import Tone from 'tone';

let sample = 'https://freesound.org/data/previews/47/47370_18799-hq.mp3';

let sampleInstrument = new Tone.GrainPlayer(sample, function() {
	sampleInstrument.reverse = true;
	sampleInstrument.grainSize = 0.1;
	sampleInstrument.overlap = 0.8;
	sampleInstrument.drift = 0.5;
	sampleInstrument.detune = -1200;
}).toMaster();
sampleInstrument.loop = true;

export default sampleInstrument;
