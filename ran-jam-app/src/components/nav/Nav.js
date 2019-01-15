import React from 'react';
import NavLink from './NavLink';
import './nav.css';

const Nav = ({ handleClick }) => {
	return (
		<div className="pure-menu pure-menu-horizontal">
			<ul className="pure-menu-list">
				<NavLink link={'KICK'} handleClick={handleClick} />
				<NavLink link={'CHORDS'} handleClick={handleClick} />
				<NavLink link={'MELODY'} handleClick={handleClick} />
				<NavLink link={'SAMPLE'} handleClick={handleClick} />
				<NavLink link={'PIANO'} handleClick={handleClick} />
				<NavLink link={'GLOBAL'} handleClick={handleClick} />
			</ul>
		</div>
	);
};

export default Nav;
