import React from 'react';
import Login from './Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Grid } from 'material-ui';
import { Route } from 'react-router-dom';
import { Clients } from './Clients';
import { withStyles } from 'material-ui/styles';
import '../App.css';

const styles = {
	root: {
	}
};

const render = () =>
	<div className="App-content">
		<Header />
		<Grid container spacing={24} justify="center">
			<Route path="/login" component={Login} />
			<AuthenticatedRoute>
				<Grid item xs={3}>
					<Sidebar />
				</Grid>
				<Grid item xs={9} className="main">
					<Route
						exact
						path="/"
						component={() =>
							<span>Bienvenue sur le portail d'administration</span>
						}
					/>
					<Route path="/clients" component={() => <Clients />} />
				</Grid>
			</AuthenticatedRoute>
		</Grid>
	</div>;
export const Content = withStyles(styles)(render);
