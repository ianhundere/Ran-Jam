import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import Loading from './Loading';
import { GOOGLE_CLIENT_ID } from './config.js';
import './login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			active: 'inactive'
		};
		this.responseGoogle = this._responseGoogle;
		this.handleGuestClick = this._handleGuestClick;
	}

	_responseGoogle = (response) => {
		if (response.error) {
			throw response.error;
		} else {
			this.setState({
				loading: true,
				active: 'active'
			});

			console.log('loading song');

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
					this.props.setLoggedIn(song);
				});
		}
	};

	_handleGuestClick() {
		this.props.setGuest();
	}

	render() {
		let loading;
		if (this.state.loading) {
			loading = <Loading />;
		}

		return (
			<div className="landing">
				<h1 className="title">RAN-JAM</h1>
				<p id="landing-text">An automated jam station for your innerjammer; built with Tone.js and React.</p>
				<div className={this.state.active} id="googlelogin">
					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogle}
						className="pure-button"
					/>
					<br />
					<label htmlFor="login">Google Login</label>
				</div>
				<div className={this.state.active} id="guestlogin">
					<button className="pure-button" id="guest-btn" onClick={this.handleGuestClick}>
						> Guest
					</button>
					<div id="guestlabel">
						<label htmlFor="guest">
							Guest Login
							<span id="disable-message">(No Saving)</span>
						</label>
					</div>
				</div>
				{loading}
			</div>
		);
	}
}

export default Login;
