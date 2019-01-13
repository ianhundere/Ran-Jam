import React, { Component } from 'react';

class TransportButton extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {
		const { mode, pattern, handleClick } = this.props;
		if (mode === 'all') {
			const [ melodyPattern, chordPattern, sampleInstrument, kickPattern ] = pattern;
			handleClick(melodyPattern, chordPattern, sampleInstrument, kickPattern);
		} else {
			handleClick(pattern);
		}
	};

	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export default TransportButton;
