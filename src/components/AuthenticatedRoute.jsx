import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
	connected: state.connected
});

export default connect(mapStateToProps)(
	({ children, connected }) => (connected ? children : <Redirect to="/login" />)
);
