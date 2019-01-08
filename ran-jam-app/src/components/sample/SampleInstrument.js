import Tone from 'tone';

let sample = 'https://freesound.org/data/previews/277/277593_5324256-hq.mp3';

let sampleInstrument = new Tone.GrainPlayer(sample, function() {
	// sampleInstrument.reverse = true;
	sampleInstrument.grainSize = 0.2;
	sampleInstrument.overlap = 0.4;
	sampleInstrument.drift = 0.2;
	// sampleInstrument.detune = -600;
	sampleInstrument.set({ volume: -20 });
	sampleInstrument.loop = true;
}).toMaster();

export default sampleInstrument;
