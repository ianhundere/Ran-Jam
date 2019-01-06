import React, { Component } from 'react';

class StopButton extends Component {
	render() {
		return (
			<button className="pure-button" onClick={this.props.clickHandler}>
				Stop
			</button>
		);
	}
}

export default StopButton;
