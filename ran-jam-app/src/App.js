import React, { Component } from 'react';
import Tone from 'tone';
import './pure-min.css';
import './App.css';

import Chords from './components/chords/Chords';
import Melody from './components/melody/Melody';
import Sample from './components/sample/Sample';
import SampleInstrument from './components/sample/SampleInstrument';
import Results from './components/sample/Results';
import Piano from './components/keyboard/Piano';
import Nav from './components/nav/Nav';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: null,
			searchResults: null,
			melodyDetune: 0,
			chordsDetune: 0,
			sample: {
				detune: 0,
				url: null
			},
			key: [],
			newKeys: [],
			oldKeys: []
		};
		this.setPage = this._setPage;
		this.setResults = this._setResults;
		this.startClickHandler = this._startClickHandler;
		this.stopClickHandler = this._stopClickHandler;
		this.octaveHandler = this._octaveHandler;
		this.setUrl = this._setUrl;
		this.changeWave = this._changeWave;
		this.setSliderVal = this._setSliderVal;
		this.testServer = this._testServer;
		this.keyTranslation = {
			z: 'C4 : Z',
			x: 'D4 : X',
			c: 'E4 : C',
			v: 'F4 : V',
			b: 'G4 : B',
			n: 'A4 : N',
			m: 'B4 : M',
			a: 'C5 : A',
			s: 'D5 : S',
			d: 'E5 : D',
			f: 'F5 : F',
			g: 'G5 : G',
			h: 'A5 : H',
			j: 'B5 : J',
			q: 'C6 : Q',
			w: 'D6 : W',
			e: 'E6 : E',
			r: 'F6 : R',
			t: 'G6 : T',
			y: 'A6 : Y',
			u: 'B6 : U',
			i: 'C7 : I'
		};

		this.keyNames = [
			'C4 : Z',
			'D4 : X',
			'E4 : C',
			'F4 : V',
			'G4 : B',
			'A4 : N',
			'B4 : M',
			'C5 : A',
			'D5 : S',
			'E5 : D',
			'F5 : F',
			'G5 : G',
			'A5 : H',
			'B5 : J',
			'C6 : Q',
			'D6 : W',
			'E6 : E',
			'F6 : R',
			'G6 : T',
			'A6 : Y',
			'B6 : U',
			'C7 : I'
		];
	}

	componentDidMount() {
		Tone.Transport.start();
		document.addEventListener('keydown', (e) => {
			let key = this.keyTranslation[e.key];
			console.log(key);
			console.log(this.state.newKeys);
			let isNew = !this.state.newKeys.includes(key);
			if (isNew) {
				this.setState({
					newKeys: [ ...this.state.newKeys, key ]
				});
			} else {
				this.setState({
					newKeys: this.state.newKeys.filter((k) => {
						return k !== key;
					})
				});
			}
			console.log();
			// console.log(e.key);
		});
		document.addEventListener('keyup', (e) => {
			const key = this.keyTranslation[e.key];
			this.setState({
				oldKeys: [ ...this.state.oldKeys, key ]
			});
			console.log();
			console.log(e.key);
		});
	}

	_setResults = (results) => {
		this.setState({
			searchResults: results,
			currentPage: 'RESULTS'
		});
	};

	_setPage = (page) => {
		this.setState({
			currentPage: page
		});
	};

	_setUrl = (url) => {
		this.setState({
			sampleUrl: url
		});
		const buffer = new Tone.Buffer(url, () => {
			SampleInstrument.set({ buffer: buffer });
		});
	};

	_startClickHandler = (pattern) => {
		pattern.start();
	};

	_stopClickHandler = (pattern) => {
		pattern.stop();
	};

	_octaveHandler = (inst, val, synth) => {
		if (synth === 'melody') {
			this.setState({
				melodyDetune: this.state.melodyDetune + val
			});
		} else if (synth === 'chords') {
			this.setState({
				chordsDetune: this.state.chordsDetune + val
			});
		}
	};

	_changeWave(wave, instrument) {
		instrument.set({ oscillator: { type: wave } });
	}

	_setSliderVal = (val) => {
		this.setState({
			sliderVal: val
		});
	};

	_testServer() {
		fetch('/test').then((res) => console.log(res));
	}

	render() {
		let partial;
		if (this.state.currentPage === 'SAMPLE') {
			partial = (
				<Sample
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					setResults={this.setResults}
					url={this.state.sampleUrl}
					setSliderVal={this.setSliderVal}
					value={this.state.sliderVal}
				/>
			);
		} else if (this.state.currentPage === 'MELODY') {
			partial = (
				<Melody
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					octaveHandler={this.octaveHandler}
					detune={this.state.melodyDetune}
					changeWave={this.changeWave}
				/>
			);
		} else if (this.state.currentPage === 'RESULTS') {
			partial = <Results results={this.state.searchResults} setUrl={this.setUrl} />;
		} else if (this.state.currentPage === 'PIANO') {
			partial = (
				<Piano
					pianoKey={this.state.key}
					allKeys={this.keyNames}
					newKeys={this.state.newKeys}
					oldKeys={this.state.oldKeys}
					insertKey={this._insertKey}
					extractKey={this._extractKey}
					isActive={this.state.isActive}
				/>
			);
		} else {
			partial = (
				<Chords
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					octaveHandler={this.octaveHandler}
					detune={this.state.chordsDetune}
					changeWave={this.changeWave}
				/>
			);
		}
		return (
			<div className="App">
				<Nav handleClick={this.setPage} />
				{partial}
				<button className="pure-button" onClick={this.testServer}>
					Save
				</button>
			</div>
		);
	}
	_insertKey = (key) => {
		this.setState({
			newKeys: this.state.newKeys.filter((note) => {
				if (note === key) {
					return false;
				} else {
					return true;
				}
			})
		});
	};
	_extractKey = (key) => {
		this.setState({
			oldKeys: this.state.oldKeys.filter((note) => {
				if (note === key) {
					return false;
				} else {
					return true;
				}
			})
		});
	};
}

export default App;
