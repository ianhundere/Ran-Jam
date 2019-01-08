import Tone from 'tone';

let sample = 'https://freesound.org/data/previews/277/277593_5324256-hq.mp3';

let sampleInstrument = new Tone.GrainPlayer(sample, function() {
	sampleInstrument.grainSize = 0.2;
	sampleInstrument.overlap = 0.4;
	sampleInstrument.drift = 0.2;
	sampleInstrument.set({ volume: -20 });
	sampleInstrument.loop = true;
}).toMaster();

export default sampleInstrument;
