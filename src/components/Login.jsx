import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardContent, TextField, Button, Grid } from 'material-ui';
import { loginRequest } from '../redux/actions';
import '../App.css';

const mapDispatchToProps = dispatch => ({
	onSubmit: credentials => {
		console.log(credentials);
		dispatch(loginRequest(credentials));
	}
});

const mapStateToProps = state => ({
	fetching: state.auth.fetching,
	error: state.auth.error,
	token: state.auth.token
});

class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			user: '',
			password: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit (event) {
		event.preventDefault();
		this.props.onSubmit(this.state);
	}

	handleInputChange ({ target }) {
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[target.name]: value
		});
	}

	render () {
		return (
			<Grid item xs={3} className="main">
				{this.props.token ? <Redirect to="/" /> : null}
				<Card>
					<CardContent>
						<form action="" noValidate onSubmit={this.handleSubmit}>
							<div>
								<TextField
									name="user"
									label="user"
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<TextField
									name="password"
									label="password"
									onChange={this.handleInputChange}
									type="password"
								/>
							</div>
							<div>
								<Button type="submit" raised>
									Connexion
								</Button>
							</div>
						</form>
						{this.props.fetching ? 'connexion pending...' : ''}
						{this.props.error ? <div>Error: {this.props.error} </div> : null}
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
