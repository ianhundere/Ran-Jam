import React, { Component } from 'react';
// import { secretStuff } from './config.js';

class Search extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		};
		this.handleChange = this._handleChange;
		this.handleSubmit = this._handleSubmit;
		this.searchFreesound = this._searchFreesound;
	}

	_handleChange = (event) => {
		this.setState({
			query: event.target.value
		});
	};

	_handleSubmit = (event) => {
		event.preventDefault();
		const { query } = this.state;
		this.searchFreesound(query);
	};

	_searchFreesound = (query) => {
		const url = `https://www.freesound.org/apiv2/search/text/?query=${query}&fields=name,previews&token=${process.env.FREESOUND_TOKEN}`;
		fetch(url).then((res) => res.json()).then((res) => {
			this.props.setResults(res.results);
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} placeholder="Search Freesound.org" />
					<button className="pure-button">Search</button>
				</form>
			</div>
		);
	}
}

export default Search;
