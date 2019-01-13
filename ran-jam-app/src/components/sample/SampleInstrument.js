import Tone from 'tone';

let sample = 'https://freesound.org/data/previews/53/53974_18799-hq.mp3';

let sampleInstrument = new Tone.GrainPlayer(sample, () => {
	sampleInstrument.grainSize = 0.2;
	sampleInstrument.overlap = 0.4;
	sampleInstrument.drift = 0.2;
	sampleInstrument.set({ volume: 0 });
	sampleInstrument.loop = true;
}).toMaster();

export default sampleInstrument;
