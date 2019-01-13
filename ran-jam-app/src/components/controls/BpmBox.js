import React, { Component } from 'react';
import Tone from 'tone';

class BpmBox extends Component {
	constructor() {
		super();
		this.state = {
			text: '60'
		};
		this.submitBPM = this._submitBPM;
		this.updateText = this._updateText;
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
			<div>
				<form onSubmit={this.submitBPM}>
					<input id="bpm" type="number" value={this.state.text} onChange={this.updateText} />
					<br />
					<button className="pure-button" type="submit">
						Enter BPM
					</button>
				</form>
			</div>
		);
	}
}

export default BpmBox;
