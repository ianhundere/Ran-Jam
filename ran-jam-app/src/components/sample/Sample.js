import React, { Component } from 'react';

import Transport from '../controls/Transport';
import CustomSlider from '../buttons/CustomSlider';
import sampleInstrument from './SampleInstrument';
import './sampler.css';
import { secretStuff } from './config.js';

class Sample extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		};
		this.handleChange = this._handleChange;
		this.handleSubmit = this._handleSubmit;
		this.searchFreesound = this._searchFreesound;
		this.handleClick = this._handleClick;
	}

	_handleChange = (event) => {
		this.setState({
			query: event.target.value
		});
	};

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

	_handleSubmit = (event) => {
		event.preventDefault();
		const query = this.state.query;
		this.searchFreesound(query);
	};

	_searchFreesound = (query) => {
		const url = `https://www.freesound.org/apiv2/search/text/?query=${query}&fields=name,previews&token=${secretStuff.FREESOUND_TOKEN}`;
		fetch(url).then((res) => res.json()).then((res) => {
			this.props.setResults(res.results);
		});
	};

	render() {
		const { detuneVal, setSliderVal, startClickHandler, stopClickHandler } = this.props;
		return (
			<div className="instrument sampler">
				<h1>SAMPLE</h1>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input type="text" onChange={this.handleChange} placeholder="Search Freesound.org" />
						<button className="pure-button">Search</button>
					</form>
				</div>
				<div>
					<button className="pure-button" onClick={this.handleClick}>
						Reverse
					</button>
				</div>
				<div>
					Speed: <CustomSlider value={detuneVal} setSliderVal={setSliderVal} />
				</div>
				<Transport
					handleStart={startClickHandler}
					handleStop={stopClickHandler}
					pattern={sampleInstrument}
					startText="START"
					stopText="STOP"
					mode="one"
				/>
			</div>
		);
	}
}

export default Sample;
