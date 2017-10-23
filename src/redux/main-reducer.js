import {
	LOGIN_REQUEST,
	LOGOUT_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	CLIENTS_REQUEST,
	CLIENTS_SUCCESS,
	CLIENTS_ERROR
} from './actions';
import * as R from 'ramda';
import { combineReducers } from 'redux';

const authDefaultState = {
	token: localStorage.getItem('appToken'),
	fetching: false,
	error: null
};

export const authReducer = (prevState = authDefaultState, action) => {
	switch (action.type) {

	case LOGOUT_SUCCESS:
		return R.assocPath([
			'token'
		], null, prevState);

	case LOGIN_REQUEST:
		return R.assocPath([
			'fetching'
		], true, prevState);

	case LOGIN_SUCCESS:
		return R.compose(
			R.assocPath(['fetching'], false),
			R.assocPath(['token'], action.payload)
		)(prevState);

	case LOGIN_ERROR:
		return R.compose(
			R.assocPath(['fetching'], false),
			R.assocPath(['error'], action.payload)
		)(prevState);

	default:
		return prevState;

	}
};

const clientsDefaultState = {
	error: null,
	fetching: false,
	list: []
};

export const clientsReducer = (prevState = clientsDefaultState, action) => {
	switch (action.type) {

	case CLIENTS_REQUEST:
		return R.compose(R.assocPath(['fetching'], true))(prevState);

	case CLIENTS_SUCCESS:
		return R.compose(
			R.assocPath(['fetching'], false),
			R.assocPath(['list'], action.payload)
		)(prevState);

	case CLIENTS_ERROR:
		return R.compose(
			R.assocPath(['error'], action.payload),
			R.assocPath(['fetching'], false)
		)(prevState);

	default:
		return prevState;

	}
};

export const mainReducer = combineReducers({
	auth: authReducer,
	clients: clientsReducer
});
