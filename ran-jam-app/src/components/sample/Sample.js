import React, { Component } from 'react';

import Transport from '../controls/Transport';
import CustomSlider from '../buttons/CustomSlider';
import sampleInstrument from './SampleInstrument';
import './sampler.css';
import Search from '../controls/Search';

class Sample extends Component {
	constructor() {
		super();
		this.handleClick = this._handleClick;
	}

	_handleClick = () => {
		let reverse;
		if (sampleInstrument.reverse) {
			reverse = false;
		} else {
			reverse = true;
		}
		sampleInstrument.set({ reverse: reverse });
		this.props.setReverse(reverse);
	};

	render() {
		const { detuneVal, setSliderVal, startClickHandler, stopClickHandler } = this.props;
		return (
			<div className="instrument sampler">
				<h1>SAMPLE</h1>
				<Search setResults={this.props.setResults} />
				<div>
					<button className="pure-button" onClick={this.handleClick}>
						Reverse
					</button>
				</div>
				<div>
					Speed: <CustomSlider value={detuneVal} setSliderVal={setSliderVal} />
				</div>
				<Transport handleStart={startClickHandler} handleStop={stopClickHandler} pattern={sampleInstrument} />
			</div>
		);
	}
}

export default Sample;
