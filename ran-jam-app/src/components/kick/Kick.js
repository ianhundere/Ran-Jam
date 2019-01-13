import React from 'react';

import { kickPattern } from './kickInstrument';
import Transport from '../controls/Transport';
import './kick.css';

const Kick = ({ startClickHandler, stopClickHandler }) => {
	return (
		<div className="instrument kick">
			<h1>KICK</h1>
			<Transport
				handleStart={startClickHandler}
				handleStop={stopClickHandler}
				Start
				pattern={kickPattern}
				startText="START"
				stopText="STOP"
				mode="one"
			/>
		</div>
	);
};
export default Kick;
