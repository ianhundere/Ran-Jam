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
import Kick from './components/kick/Kick';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			currentPage: 'LOGIN',
			searchResults: null,
			melodyDetune: 0,
			chordsDetune: 0,
			chords: {
				detune: 0,
				oscillator: {
					type: 'sine'
				}
			},
			melody: {
				detune: 0,
				oscillator: {
					type: 'sine'
				}
			},
			sample: {
				detune: 0,
				url: null,
				reverse: false
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
		// this.testServer = this._testServer;
		this.setBuffer = this._setBuffer;
		this.handleSave = this._handleSave;
		this.setLoggedIn = this._setLoggedIn;
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
		// Tone.Transport.bpm.value = 60;
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

	_setBuffer = (url) => {
		const buffer = new Tone.Buffer(url, () => {
			SampleInstrument.set({ buffer: buffer });
		});
	};

	_setUrl = (url) => {
		console.log(url);
		this.setState({
			sample: {
				...this.state.sample,
				url: url
			}
		});
		this.setBuffer(url);
	};

	_setLoggedIn = (song) => {
		const { chords, melody, sample, _id } = song;
		console.log(chords);
		this.setState({
			loggedIn: true,
			_id: _id,
			sample: sample[0],
			chords: chords[0],
			melody: melody[0]
		});
	};

	_handleSave = () => {
		fetch('/save', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}).then(console.log('song is saved!'));
	};

	_startClickHandler = (pattern) => {
		pattern.start();
	};

	_stopClickHandler = (pattern) => {
		pattern.stop();
	};

	_octaveHandler = (val, synth) => {
		if (synth === 'melody') {
			this.setState({
				melody: {
					...this.state.melody,
					detune: this.state.melody.detune + val
				}
			});
		} else if (synth === 'chords') {
			this.setState({
				chords: {
					...this.state.chords,
					detune: this.state.chords.detune + val
				}
			});
		}
	};

	_changeWave = (wave, synth) => {
		if (synth === 'melody') {
			this.setState({
				melody: {
					...this.state.melody,
					oscillator: { type: wave }
				}
			});
		} else if (synth === 'chords') {
			this.setState({
				chords: {
					...this.state.chords,
					oscillator: { type: wave }
				}
			});
		}
	};

	_setSliderVal = (val) => {
		this.setState({
			sample: {
				...this.state.sample,
				detune: val
			}
		});
	};

	// _testServer() {
	// 	fetch('/test').then((res) => console.log(res));
	// }

	render() {
		const { sample, chords, melody } = this.state;
		let partial;
		if (this.state.currentPage === 'SAMPLE') {
			partial = (
				<Sample
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					setResults={this.setResults}
					url={sample.url}
					setSliderVal={this.setSliderVal}
					detuneVal={sample.detune}
					setBuffer={this.setBuffer}
				/>
			);
		} else if (this.state.currentPage === 'MELODY') {
			partial = (
				<Melody
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					octaveHandler={this.octaveHandler}
					detune={melody.detune}
					changeWave={this.changeWave}
					settings={melody}
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
		} else if (this.state.currentPage === 'KICK') {
			partial = <Kick startClickHandler={this.startClickHandler} stopClickHandler={this.stopClickHandler} />;
		} else if (this.state.currentPage === 'CHORDS') {
			partial = (
				<Chords
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					octaveHandler={this.octaveHandler}
					detune={chords.detune}
					changeWave={this.changeWave}
					settings={chords}
				/>
			);
		}
		if (this.state.loggedIn) {
			return (
				<div className="App">
					<Nav handleClick={this.setPage} />
					{partial}
					<button className="pure-button" onClick={this.handleSave}>
						SAVE
					</button>
				</div>
			);
		} else {
			return <Login setLoggedIn={this.setLoggedIn} />;
		}
	}
}

export default App;
