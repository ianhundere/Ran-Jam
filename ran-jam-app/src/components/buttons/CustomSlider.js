import Slider from 'rc-slider';
import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import sampleInstrument from '../sample/SampleInstrument';

class CustomSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value
		};
		this.onSliderChange = this._onSliderChange;
	}

	_onSliderChange = (value) => {
		console.log(value);
		this.setState({
			value: value
		});
		sampleInstrument.set({ detune: value });
		this.props.setSliderVal(value);
	};

	_onAfterChange = (value) => {
		console.log(value);
	};

	render() {
		return (
			<Slider value={this.state.value} min={-2400} max={2400} onChange={this.onSliderChange} marks={{ 0: '' }} />
		);
	}
}

export default CustomSlider;
