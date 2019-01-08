import React, { Component } from 'react';

class SearchButton extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {};

	render() {
		return (
			<button onClick={this.handleClick} className="pure-button">
				{this.props.text}
			</button>
		);
	}
}

export default SearchButton;
