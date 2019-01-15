import React from 'react';
import './welcome.css';

const Welcome = () => {
	return (
		<div>
			<div id="welcome-container">
				<h1 id="welcome">Welcome</h1>
				<div id="text-container">
					<div id="welcome-text">
						Ran-Jam offers you hours of jamming freedom. Click on any of the instruments in the navigation
						bar above and click on "Start" to begin. Play with the settings and see how far into outer space
						you can get.
					</div>
				</div>
			</div>
			<p id="disclaimer">
				Note: The Web Audio API is an experimental technology which is not yet supported by all browsers. For
				the best experience, please use the latest versions of Google Chrome or Mozilla Firefox.
			</p>
		</div>
	);
};

export default Welcome;
