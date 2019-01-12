import React, { Component } from 'react';

import StartButton from '../buttons/StartButton';
import StopButton from '../buttons/StopButton';
import CustomSlider from '../buttons/CustomSlider';
import sampleInstrument from './SampleInstrument';
import './sampler.css';
import { secretStuff } from './config.js';

class Sample extends Component {
	constructor() {
		super();
		this.state = {
			samplePattern: sampleInstrument,
			query: ''
		};
		this.handleChange = this._handleChange;
		this.handleSubmit = this._handleSubmit;
		this.searchFreesound = this._searchFreesound;
		this.handleClick = this._handleClick;
	}

	componentDidMount() {
		console.log(this.props.url);
		sampleInstrument.set({
			detune: this.props.detuneVal
		});
		this.props.setBuffer(this.props.url);
	}

	_handleChange = (event) => {
		this.setState({
			query: event.target.value
		});
	};

	_handleClick = () => {
		if (sampleInstrument.reverse) {
			sampleInstrument.set({ reverse: false });
		} else {
			sampleInstrument.set({ reverse: true });
		}
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
					Speed: <CustomSlider value={this.props.detuneVal} setSliderVal={this.props.setSliderVal} />
				</div>
				<StartButton startClickHandler={this.props.startClickHandler} pattern={this.state.samplePattern}>
					Start
				</StartButton>
				<StopButton stopClickHandler={this.props.stopClickHandler} pattern={this.state.samplePattern} />
			</div>
		);
	}
}

export default Sample;
