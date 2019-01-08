import React, { Component } from 'react';
import Tone from 'tone';

import delay from '../fx/delay';
import Key from './Key';
import './Keyboard.css';

class Piano extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentNotes: []
		};

		this.synth = new Tone.PolySynth({
			oscillator: {
				partials: [ 0, 2, 3, 4 ]
			},
			envelope: {
				attack: 0.01,
				decay: 1,
				sustain: 0,
				release: 3
			},
			filterEnvelope: {
				attack: 0,
				decay: 5,
				sustain: 1,
				release: 1,
				baseFrequency: 1200,
				octaves: 7,
				exponent: 0
			},
			volume: -20
		}).chain(delay);
	}

	noteOn = (note) => {
		this.setState({ currentNotes: [ ...this.state.currentNotes, note ] }, () => {
			this.synth.triggerAttackRelease(note);
			console.log(note);
		});
	};
	noteOff = (note) => {
		this.setState(
			{
				currentNotes: this.state.currentNotes.filter((n) => {
					return n !== note;
				})
			},
			() => {
				this.synth.triggerRelease(note);
				console.log('TURNED OFF A NOTE!');
			}
		);
	};

	render() {
		if (this.props.oldKeys) {
			this.props.oldKeys.forEach((key) => {
				this.noteOff(key);
				this.props.extractKey(key);
			});
		}
		if (this.props.newKeys) {
			this.props.newKeys.forEach((key) => {
				this.noteOn(key);
				this.props.insertKey(key);
			});
			const keyList = this.props.allKeys.map((key) => (
				<Key
					key={key}
					synth={this.synth}
					note={key}
					active={this.state.currentNotes.includes(key)}
					noteOn={this.noteOn}
					noteOff={this.noteOff}
				/>
			));
			return (
				<div className="instrument">
					<h1>PIANO</h1>
					<div className="container" ref={(node) => node && node.setAttribute('touch-action', 'none')}>
						{keyList}
					</div>
				</div>
			);
		}
	}
}
export default Piano;
