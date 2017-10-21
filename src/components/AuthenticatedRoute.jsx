import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
	token: state.auth.token
});

export default connect(mapStateToProps)(
	({ children, token }) =>
		token ? children : <Redirect to="/login" />
);
