import React, { Component } from 'react';
import Tone from 'tone';
import './App.css';

import Chords from './components/chords/Chords';
import Melody from './components/melody/Melody';
import Sample from './components/sample/Sample';
import Piano from './components/keyboard/Piano';
import Nav from './components/nav/Nav';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: null,
			melodyDetune: 0,
			chordsDetune: 0,
			key: [],
			newKeys: [],
			oldKeys: []
		};
		this.setPage = this.setPage.bind(this);
		this.startClickHandler = this.startClickHandler.bind(this);
		this.stopClickHandler = this.stopClickHandler.bind(this);
		this.octaveHandler = this.octaveHandler.bind(this);
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

	setPage(page) {
		this.setState({
			currentPage: page
		});
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

	startClickHandler(pattern) {
		pattern.start();
	}

	stopClickHandler(pattern) {
		pattern.stop();
	}

	octaveHandler(inst, val, synth) {
		if (synth === 'melody') {
			this.setState({
				melodyDetune: this.state.melodyDetune + val
			});
		} else if (synth === 'chords') {
			this.setState({
				chordsDetune: this.state.chordsDetune + val
			});
		}
	}

	render() {
		let partial;
		if (this.state.currentPage === 'SAMPLE') {
			partial = <Sample startClickHandler={this.startClickHandler} stopClickHandler={this.stopClickHandler} />;
		} else if (this.state.currentPage === 'MELODY') {
			partial = (
				<Melody
					startClickHandler={this.startClickHandler}
					stopClickHandler={this.stopClickHandler}
					octaveHandler={this.octaveHandler}
					detune={this.state.melodyDetune}
				/>
			);
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
				/>
			);
		}
		return (
			<div className="App">
				<Nav handleClick={this.setPage} />
				{partial}
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
