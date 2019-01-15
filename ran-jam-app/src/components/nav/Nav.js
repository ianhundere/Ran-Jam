import React, { Component } from 'react';
import NavLink from './NavLink';
import './nav.css';

class Nav extends Component {
	render() {
		return (
			<div className="pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					<NavLink link={'KICK'} handleClick={this.props.handleClick} />
					<NavLink link={'CHORDS'} handleClick={this.props.handleClick} />
					<NavLink link={'MELODY'} handleClick={this.props.handleClick} />
					<NavLink link={'SAMPLE'} handleClick={this.props.handleClick} />
					<NavLink link={'PIANO'} handleClick={this.props.handleClick} />
					<NavLink link={'GLOBAL'} handleClick={this.props.handleClick} />
				</ul>
			</div>
		);
	}
}

export default Nav;
