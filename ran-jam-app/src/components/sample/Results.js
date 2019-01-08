import React from 'react';

const Results = ({ results, setUrl }) => {
	const samples = results.map((res) => {
		const url = res.previews['preview-hq-mp3'];
		return (
			<li key={res.name}>
				{res.name}{' '}
				<button
					className="pure-button"
					onClick={() => {
						setUrl(url);
					}}
				>
					LOAD
				</button>
			</li>
		);
	});

	return (
		<div>
			<h1>Search Results:</h1>
			<ul>{samples}</ul>
		</div>
	);
};

export default Results;
