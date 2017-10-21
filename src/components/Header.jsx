import React from 'react';
import { AppBar, Toolbar, Typography, Button } from 'material-ui';
import { connect } from 'react-redux';
import { requestLogout } from '../redux/actions';

const mapStateToProps = state => ({
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	logout: token => dispatch(requestLogout(token))
});

const render = ({ logout, token }) =>
	<AppBar position="static">
		<Toolbar>
			<Typography type="title" color="inherit">
				Title
			</Typography>
			<Button role="button" raised onClick={() => logout(token)}>Logout</Button>
		</Toolbar>
	</AppBar>;
export const Header = connect(mapStateToProps, mapDispatchToProps)(render);
