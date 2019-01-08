import React, { Component } from 'react';

class StopButton extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {
		let pattern = this.props.pattern;
		this.props.stopClickHandler(pattern);
	};

	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				Stop
			</button>
		);
	}
}

export default StopButton;
