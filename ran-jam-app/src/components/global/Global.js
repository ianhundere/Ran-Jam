import React, { Component } from 'react';
import Tone from 'tone';

import AllButton from '../buttons/AllButton';
import Transpose from '../controls/Transpose';
import './global.css';
import { melodyPattern } from '../melody/melodyInstrument';
import { chordPattern } from '../chords/chordInstrument';
import { kickPattern } from '../kick/kickInstrument';
import sampleInstrument from '../sample/SampleInstrument';

class Global extends Component {
	constructor() {
		super();
		this.state = {
			text: '60'
		};
	}
	_submitBPM = (e) => {
		const bpm = parseInt(this.state.text);
		e.preventDefault();
		Tone.Transport.bpm.value = bpm;
	};

	_updateText = (event) => {
		const newText = event.target.value;
		console.log(this);
		this.setState({
			text: newText
		});
	};
	render() {
		return (
			<div className="instrument global">
				<h1>GLOBAL</h1>
				<div>
					<form onSubmit={this._submitBPM}>
						<input id="bpm" type="number" value={this.state.text} onChange={this._updateText} />
						<br />
						<button className="pure-button" type="submit">
							Enter BPM
						</button>
					</form>
				</div>
				<div>
					Transpose:
					<Transpose detuneHandler={this.props.detuneHandler} synth="all" plus={100} minus={-100} />
				</div>
				<div>
					<AllButton
						handleStart={this.props.startAll}
						melodyPattern={melodyPattern}
						chordPattern={chordPattern}
						samplePattern={sampleInstrument}
						kickPattern={kickPattern}
					>
						START ALL
					</AllButton>
					<AllButton
						handleStart={this.props.stopAll}
						melodyPattern={melodyPattern}
						chordPattern={chordPattern}
						samplePattern={sampleInstrument}
						kickPattern={kickPattern}
					>
						STOP ALL
					</AllButton>
				</div>
			</div>
		);
	}
}

export default Global;
