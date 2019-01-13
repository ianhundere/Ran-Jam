import React, { Component } from 'react';
import Tone from 'tone';

import StartButton from '../buttons/StartButton';
import StopButton from '../buttons/StopButton';
import { drumKick, kickPattern } from './kickInstrument';

class Kick extends Component {
	constructor() {
		super();
		this.state = {
			text: '120',
			kickPattern: kickPattern
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
		drumKick.set(this.props.settings);
		return (
			<div className="instrument sampler">
				<h1>KICK</h1>
				<form onSubmit={this._submitBPM}>
					<input id="bpm" type="number" value={this.state.text} onChange={this._updateText} />
					<br />
					<button className="pure-button" type="submit">
						Enter BPM
					</button>
				</form>
				<StartButton startClickHandler={this.props.startClickHandler} pattern={this.state.kickPattern}>
					Start
				</StartButton>
				<StopButton stopClickHandler={this.props.stopClickHandler} pattern={this.state.kickPattern} />
			</div>
		);
	}
}
export default Kick;
