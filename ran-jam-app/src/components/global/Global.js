import React from 'react';

import Transport from '../controls/Transport';
import Transpose from '../controls/Transpose';
import BpmBox from '../controls/BpmBox';
import './global.css';
import { melodyPattern } from '../melody/melodyInstrument';
import { chordPattern } from '../chords/chordInstrument';
import { kickPattern } from '../kick/kickInstrument';
import sampleInstrument from '../sample/SampleInstrument';

const Global = ({ detuneHandler, startClickHandler, stopClickHandler }) => {
	return (
		<div className="instrument global">
			<h1>GLOBAL</h1>
			<div>
				Transpose:
				<Transpose detuneHandler={detuneHandler} synth="all" plus={100} minus={-100} />
			</div>
			<div>
				<BpmBox text={60} />
			</div>
			<Transport
				handleStart={startClickHandler}
				handleStop={stopClickHandler}
				pattern={[ melodyPattern, chordPattern, sampleInstrument, kickPattern ]}
				startText="START ALL"
				stopText="STOP ALL"
				mode="all"
			/>
		</div>
	);
};

export default Global;
