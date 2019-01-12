import React, { Component } from 'react';
import soundfile from './sounds/housedrop.wav';

import Tone from 'tone';

class Kick extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '120' };
		this.player = new Tone.Player({
			url: soundfile
		}).toMaster();
	}

	_start = () => {
		Tone.Transport.scheduleRepeat((time) => {
			this.player.start(time);
		}, '2n');
		this.player.sync().start();
		this.player.set({ volume: -10 });
	};

	_stop = () => {
		this.player.stop();
	};

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
			<div className="instrument sampler">
				<h1>KICK</h1>
				<form onSubmit={this._submitBPM}>
					<input id="bpm" type="number" value={this.state.text} onChange={this._updateText} />
					<br />
					<button className="pure-button" type="submit">
						Enter BPM
					</button>
				</form>
				<button className="pure-button" onClick={this._start}>
					Start
				</button>
				<button className="pure-button" onClick={this._stop}>
					Stop
				</button>
			</div>
		);
	}
}
export default Kick;
