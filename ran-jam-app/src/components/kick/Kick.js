import React, { Component } from 'react';

import StartButton from '../buttons/StartButton';
import StopButton from '../buttons/StopButton';
import { drumKick, kickPattern } from './kickInstrument';
import './kick.css';

class Kick extends Component {
	constructor() {
		super();
		this.state = {
			kickPattern: kickPattern
		};
	}

	render() {
		drumKick.set(this.props.settings);
		return (
			<div className="instrument kick">
				<h1>KICK</h1>
				<StartButton startClickHandler={this.props.startClickHandler} pattern={this.state.kickPattern}>
					Start
				</StartButton>
				<StopButton stopClickHandler={this.props.stopClickHandler} pattern={this.state.kickPattern} />
			</div>
		);
	}
}
export default Kick;
