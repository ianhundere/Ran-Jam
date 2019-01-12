import React, { Component } from 'react';

class StartButton extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {
		let pattern = this.props.pattern;
		this.props.startClickHandler(pattern);
	};
	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export default StartButton;
