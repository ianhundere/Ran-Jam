import React from 'react';
import SaveButton from './components/buttons/SaveButton';
const PagePK = ({ children, handleSave, guest }) => {
	let save;
	if (!guest) {
		save = <SaveButton handleSave={handleSave} />;
	}
	return (
		<div>
			{children}
			{save}
		</div>
	);
};

export default PagePK;
