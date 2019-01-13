import React, { Component } from 'react';

class AllButton extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {
		const { handleStart, melodyPattern, samplePattern, chordPattern, kickPattern } = this.props;
		handleStart(melodyPattern, chordPattern, samplePattern, kickPattern);
	};

	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export default AllButton;
