import React from 'react';
import { PulseLoader } from 'halogenium';

const Loading = () => {
	return (
		<div id="loading" className="fadeIn">
			<PulseLoader color="#26A65B" size="16px" margin="4px" />
			<p>Warming up the instruments...</p>
		</div>
	);
};

export default Loading;
