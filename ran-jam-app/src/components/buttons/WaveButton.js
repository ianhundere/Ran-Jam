import React from 'react';
import sinewave from '../../sinewave.png';

const WaveButton = ({ changeWave, wave, synth }) => {
	return (
		<img
			alt="sinewave"
			src={sinewave}
			onClick={() => {
				changeWave(wave, synth);
			}}
			className="pure-button"
			id="wave-button"
		/>
	);
};

export default WaveButton;
