import React, { Component } from 'react';
import Tone from 'tone';
import './pure-min.css';
import './App.css';

import { chordSynth, chordPattern } from './components/chords/chordInstrument';
import { melodySynth, melodyPattern } from './components/melody/melodyInstrument';
import sampleInstrument from './components/sample/SampleInstrument';
import Results from './components/sample/Results';
import Piano from './components/keyboard/Piano';
import Kick from './components/kick/Kick';
import SampleName from './components/sample/SampleName';
import Page from './Page';
import PagePK from './PagePK';
import Welcome from './components/welcome/Welcome';
import Transpose from './components/controls/Transpose';
import Waveform from './components/controls/Waveform';
import Search from './components/controls/Search';
import Reverse from './components/controls/Reverse';
import CustomSlider from './components/buttons/CustomSlider';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import { kickPattern } from './components/kick/kickInstrument';
import BpmBox from './components/controls/BpmBox';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			guest: false,
			currentPage: 'LOGIN',
			searchResults: null,
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
				reverse: false,
				name: ''
			},
			key: [],
			newKeys: [],
			oldKeys: []
		};
		this.setPage = this._setPage;
		this.setResults = this._setResults;
		this.startClickHandler = this._startClickHandler;
		this.stopClickHandler = this._stopClickHandler;
		this.detuneHandler = this._detuneHandler;
		this.setUrl = this._setUrl;
		this.changeWave = this._changeWave;
		this.setSliderVal = this._setSliderVal;
		this.setReverse = this._setReverse;
		this.setBuffer = this._setBuffer;
		this.handleSave = this._handleSave;
		this.setLoggedIn = this._setLoggedIn;
		this.setGuest = this._setGuest;
		this.keyTranslation = {
			i: 'C7 : I',
			u: 'B6 : U',
			y: 'A6 : Y',
			t: 'G6 : T',
			r: 'F6 : R',
			e: 'E6 : E',
			w: 'D6 : W',
			q: 'C6 : Q',
			j: 'B5 : J',
			h: 'A5 : H',
			g: 'G5 : G',
			f: 'F5 : F',
			d: 'E5 : D',
			s: 'D5 : S',
			a: 'C5 : A',
			m: 'B4 : M',
			n: 'A4 : N',
			b: 'G4 : B',
			v: 'F4 : V',
			c: 'E4 : C',
			x: 'D4 : X',
			z: 'C4 : Z'
		};

		this.keyNames = [
			'C7 : I',
			'B6 : U',
			'A6 : Y',
			'G6 : T',
			'F6 : R',
			'E6 : E',
			'D6 : W',
			'C6 : Q',
			'B5 : J',
			'A5 : H',
			'G5 : G',
			'F5 : F',
			'E5 : D',
			'D5 : S',
			'C5 : A',
			'B4 : M',
			'A4 : N',
			'G4 : B',
			'F4 : V',
			'E4 : C',
			'D4 : X',
			'C4 : Z'
		];
	}

	componentDidMount() {
		Tone.Transport.bpm.value = 60;
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
		});
		document.addEventListener('keyup', (e) => {
			const key = this.keyTranslation[e.key];
			this.setState({
				oldKeys: [ ...this.state.oldKeys, key ]
			});
			console.log(e.key);
		});
	}

	_didStartPlaying = (key) => {
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
	_didStopPlaying = (key) => {
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
			sampleInstrument.set({ buffer: buffer });
		});
	};

	_setReverse = (bool) => {
		this.setState({
			sample: {
				...this.state.sample,
				reverse: bool
			}
		});
	};

	_startClickHandler = (...patterns) => {
		for (var i = 0; i < patterns.length; i++) {
			console.log(patterns[i]);
			patterns[i].start();
		}
	};

	_stopClickHandler = (...patterns) => {
		for (var i = 0; i < patterns.length; i++) {
			if (patterns[i].state === 'started') patterns[i].stop();
		}
	};

	_setUrl = (url, name) => {
		this.setState({
			sample: {
				...this.state.sample,
				url: url,
				name: name
			}
		});
		this.setBuffer(url);
	};

	_setLoggedIn = (song) => {
		const { chords, melody, sample, _id } = song;
		this.setState({
			loggedIn: true,
			currentPage: 'WELCOME',
			_id: _id,
			sample: sample[0],
			chords: chords[0],
			melody: melody[0]
		});
	};

	_setGuest = () => {
		this.setState({
			guest: true,
			currentPage: 'WELCOME'
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

	_detuneHandler = (val, synth) => {
		const { melody, chords, sample } = this.state;
		if (synth === 'melody') {
			this.setState({
				melody: {
					...melody,
					detune: melody.detune + val
				},
				sample: {
					...sample,
					detune: sample.detune + val
				}
			});
		} else if (synth === 'chords') {
			this.setState({
				chords: {
					...chords,
					detune: chords.detune + val
				}
			});
		} else if (synth === 'all') {
			this.setState({
				chords: {
					...chords,
					detune: chords.detune + val
				},
				melody: {
					...melody,
					detune: melody.detune + val
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

	render() {
		const { sample, chords, melody, currentPage, searchResults, loggedIn, guest } = this.state;
		const pageProps = {
			startClickHandler: this.startClickHandler,
			stopClickHandler: this.stopClickHandler,
			handleSave: this.handleSave,
			guest: guest
		};
		const pagepkProps = {
			handleSave: this.handleSave,
			guest: guest
		};
		melodySynth.set(melody);
		chordSynth.set(chords);
		sampleInstrument.set({
			detune: sample.detune
		});
		this.setBuffer(sample.url);
		let partial;
		if (currentPage === 'SAMPLE') {
			partial = (
				<Page header="S A M P L E" color="#CBB274" pattern={sampleInstrument} {...pageProps}>
					<Search setResults={this.setResults} />
					<SampleName name={sample.name} />
					<Reverse setReverse={this.setReverse} />
					<CustomSlider value={sample.detune} setSliderVal={this.setSliderVal}>
						Speed:
					</CustomSlider>
				</Page>
			);
		} else if (currentPage === 'MELODY') {
			partial = (
				<Page header="M E L O D Y" color="#C16F7A" pattern={melodyPattern} {...pageProps}>
					<Transpose detuneHandler={this.detuneHandler} synth="melody" plus={1200} minus={-1200}>
						Octave:
					</Transpose>
					<Waveform changeWave={this.changeWave} synth="melody" />
				</Page>
			);
		} else if (currentPage === 'RESULTS') {
			partial = <Results results={searchResults} setUrl={this.setUrl} />;
		} else if (currentPage === 'WELCOME') {
			partial = <Welcome />;
		} else if (this.state.currentPage === 'PIANO') {
			partial = (
				<div>
					<PagePK {...pagepkProps}>
						<Piano
							pianoKey={this.state.key}
							allKeys={this.keyNames}
							newKeys={this.state.newKeys}
							oldKeys={this.state.oldKeys}
							didStartPlaying={this._didStartPlaying}
							didStopPlaying={this._didStopPlaying}
							isActive={this.state.isActive}
						/>
					</PagePK>
				</div>
			);
		} else if (this.state.currentPage === 'KICK') {
			partial = (
				<div>
					<PagePK {...pagepkProps}>
						<Kick {...pageProps} />
					</PagePK>
				</div>
			);
		} else if (currentPage === 'CHORDS') {
			partial = (
				<Page header="C H O R D S" color="#575F8B" pattern={chordPattern} {...pageProps}>
					<Transpose detuneHandler={this.detuneHandler} synth="chords" plus={1200} minus={-1200}>
						Octave:
					</Transpose>
					<Waveform changeWave={this.changeWave} synth="chords" />
				</Page>
			);
		} else if (currentPage === 'GLOBAL') {
			partial = (
				<Page
					header="G L O B A L"
					color="#7DB064"
					pattern={[ melodyPattern, chordPattern, sampleInstrument, kickPattern ]}
					mode="all"
					{...pageProps}
				>
					<Transpose detuneHandler={this.detuneHandler} synth="all" plus={100} minus={-100}>
						Transpose:
					</Transpose>
					<BpmBox>BPM: </BpmBox>
				</Page>
			);
		}

		if (loggedIn || guest) {
			return (
				<div className="App">
					<Nav handleClick={this.setPage} />
					{partial}
				</div>
			);
		} else {
			return <Login setLoggedIn={this.setLoggedIn} setGuest={this.setGuest} />;
		}
	}
}

export default App;
