import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { clientsRequest } from '../redux/actions';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	IconButton,
	Button,
	Card,
	CardContent
} from 'material-ui';
import { trace } from '../utils/main-utils';

import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import SaveIcon from 'material-ui-icons/Save';

const mapStateToProps = state => ({
	token: state.auth.token,
	error: state.clients.error,
	fetching: state.clients.fetching,
	list: state.clients.list
});

const mapDispatchToProps = dispatch => ({
	clientsRequest: token => {
		dispatch(clientsRequest(token));
	}
});

class component extends Component {
	componentDidMount () {
		this.props.clientsRequest(this.props.token);
	}

	render () {
		return (
			<div className="main__content">
				<Card>
					<CardContent>
						<h3>Clients</h3>
						<div>{this.props.error ? this.props.error : null}</div>
						<div>{this.props.fetching ? 'updating clients list...' : ''}</div>
						<Button raised>Ajouter un client</Button>
						<List>
							{this.props.list.map(entry =>
								<ListItem key={entry.id}>
									<TextField value={entry.name} />
									<TextField value={entry.type} />
									<TextField value={entry.sector} />
									<IconButton>
										<SaveIcon />
									</IconButton>
									<IconButton>
										<DeleteForeverIcon />
									</IconButton>
								</ListItem>)}
						</List>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export const Clients = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(component)
);
