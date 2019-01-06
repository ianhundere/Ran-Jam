import React, { Component } from 'react';
import './Chords.css';

class StartButton extends Component {
	render() {
		return (
			<button className="pure-button" onClick={this.props.clickHandler}>
				Stop
			</button>
		);
	}
}

export default StartButton;
