import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	CLIENTS_REQUEST,
	loginSuccess,
	loginError,
	logoutSuccess,
	logoutError,
	clientsSuccess,
	clientsError
} from './actions';

import { login, logout, fetchClients } from '../services/main-service';

const authSaga = function *(action) {
	console.log('authSaga');
	try {
		const token = yield call(login, action.payload);
		yield put(loginSuccess(token));
	}
	catch (error) {
		console.error(error);
		yield put(loginError(error.toString()));
	}
};

const logoutSaga = function *(action) {
	console.log('logout saga');
	try {
		yield call(logout, action.payload);
		yield put(logoutSuccess());
	}
	catch (error) {
		console.error(error);
		yield put(logoutError(error.toString));
	}
};

const clientsSaga = function *(action) {
	console.log('clientsSaga');
	try {
		const list = yield call(fetchClients, action.payload);
		yield put(clientsSuccess(list));
	}
	catch (error) {
		console.error(error);
		yield put(clientsError(error.toString()));
	}
};

export const mainSaga = function *mainSaga () {
	yield all([
		takeLatest(LOGIN_REQUEST, authSaga),
		takeLatest(LOGOUT_REQUEST, logoutSaga),
		takeLatest(CLIENTS_REQUEST, clientsSaga)
	]);
};

// /*
//  * Alternatively you may use takeLatest.
//  *
//  * Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//  * dispatched while a fetch is already pending, that pending fetch is cancelled
//  * and only the latest one will be run.
//  */
// function *mySaga () {
// 	yield takeLatest('USER_FETCH_REQUESTED', fetchUser);
// }

// export default mySaga;
