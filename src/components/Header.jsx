import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from 'material-ui';
import { connect } from 'react-redux';
import { logoutRequest } from '../redux/actions';

const mapStateToProps = state => ({
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	logout: token => dispatch(logoutRequest(token))
});

const render = ({ logout, token }) =>
	<AppBar position="static">
		<Toolbar>
			<Grid container>
				<Grid item xs={9}>
					<Typography type="title" color="inherit">
						Title
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Button role="button" raised onClick={() => logout(token)}>
						Logout
					</Button>
				</Grid>
			</Grid>
		</Toolbar>
	</AppBar>;
export const Header = connect(mapStateToProps, mapDispatchToProps)(render);
