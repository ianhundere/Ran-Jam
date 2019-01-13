import React, { Component } from 'react';

class TransposeButton extends Component {
	constructor() {
		super();
		this._handleClick = this.handleClick;
	}

	_handleClick = () => {
		// let pattern = this.props.pattern;
		// this.props.startClickHandler(pattern);
	};

	render() {
		return (
			<button className="pure-button" onClick={this.handleClick}>
				{this.props.children}
			</button>
		);
	}
}

export default TransposeButton;
