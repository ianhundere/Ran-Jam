import React from 'react';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID } from './config.js';
import './login.css';

const Login = ({ setLoggedIn }) => {
	const responseGoogle = (response) => {
		if (response.error) {
			throw response.error;
		} else {
			const { tokenId, profileObj: { email, givenName } } = response;
			fetch('/songs', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: tokenId,
					email: email,
					name: givenName
				})
			})
				.then((song) => song.json())
				.then((song) => {
					setLoggedIn(song);
				});
		}
	};

	return (
		<div className="login">
			<GoogleLogin
				clientId={GOOGLE_CLIENT_ID}
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				className="pure-button"
			/>
		</div>
	);
};

export default Login;
