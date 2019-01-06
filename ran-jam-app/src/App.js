import React, { Component } from 'react';
import Tone from 'tone';
import './App.css';

import Chords from './components/chords/Chords';

class App extends Component {
	componentDidMount() {
		Tone.Transport.start();
	}

	render() {
		return (
			<div className="App">
				<Chords />
			</div>
		);
	}
}

export default App;
