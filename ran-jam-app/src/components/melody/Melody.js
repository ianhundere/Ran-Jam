import React, { Component } from 'react';

import StartButton from '../buttons/StartButton';
import StopButton from '../buttons/StopButton';
import Transpose from '../controls/Transpose';
import { melodyPattern } from './melodyInstrument';
import Waveform from '../controls/Waveform';
import './melody.css';

class Melody extends Component {
	constructor() {
		super();
		this.state = {
			melodyPattern: melodyPattern
		};
	}

	render() {
		return (
			<div className="instrument melody">
				<h1>MELODY</h1>
				<div>
					Octave:
					<Transpose detuneHandler={this.props.detuneHandler} synth="melody" plus={1200} minus={-1200} />
				</div>
				<div>
					Waveform:
					<Waveform changeWave={this.props.changeWave} synth="melody" />
				</div>
				<StartButton startClickHandler={this.props.startClickHandler} pattern={this.state.melodyPattern}>
					Start
				</StartButton>
				<StopButton stopClickHandler={this.props.stopClickHandler} pattern={this.state.melodyPattern} />
			</div>
		);
	}
}

export default Melody;
