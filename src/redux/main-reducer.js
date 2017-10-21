import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from './actions';
import * as R from 'ramda';

const defaultState = {
	auth: {
		token: localStorage.getItem('appToken'),
		fetching: false,
		error: null
	}
};

export const MainReducer = (prevState = defaultState, action) => {
	switch (action.type) {

	case LOGOUT_REQUEST:
		return R.assocPath([
			'auth',
			'token'
		], null, prevState);

	case LOGIN_REQUEST:
		return R.assocPath([
			'auth',
			'fetching'
		], true, prevState);

	case LOGIN_SUCCESS:
		return R.compose(
			R.assocPath([
				'auth',
				'fetching'
			], false),
			R.assocPath([
				'auth',
				'token'
			], action.payload)
		)(prevState);

	case LOGIN_ERROR:
		return R.compose(
			R.assocPath([
				'auth',
				'fetching'
			], false),
			R.assocPath([
				'auth',
				'error'
			], action.payload)
		)(prevState);

	default:
		return prevState;

	}
};
