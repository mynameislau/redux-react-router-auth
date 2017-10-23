import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import { withRouter } from 'react-router-dom';

const render = ({ history }) =>
	<List>
		<ListItem button onClick={() => history.push('/clients')}>
			<ListItemIcon>
				<InboxIcon />
			</ListItemIcon>
			<ListItemText primary="Clients" />
		</ListItem>
		<ListItem button onClick={() => history.push('/users')}>
			<ListItemIcon>
				<DraftsIcon />
			</ListItemIcon>
			<ListItemText primary="Users" />
		</ListItem>
		<ListItem button onClick={() => history.push('/evenements')}>
			<ListItemIcon>
				<DraftsIcon />
			</ListItemIcon>
			<ListItemText primary="Evenement" />
		</ListItem>
		<ListItem button onClick={() => history.push('/experiences')}>
			<ListItemIcon>
				<DraftsIcon />
			</ListItemIcon>
			<ListItemText primary="Experience" />
		</ListItem>
	</List>;
export const Sidebar = withRouter(render);
