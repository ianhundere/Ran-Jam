import React, { Component } from 'react';

class StartButton extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let pattern = this.props.pattern;
		this.props.startClickHandler(pattern);
	}
	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				Start
			</button>
		);
	}
}

export default StartButton;
