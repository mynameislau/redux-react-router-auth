export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const CLIENTS_REQUEST = 'CLIENTS_REQUEST';
export const CLIENTS_SUCCESS = 'CLIENTS_SUCCESS';
export const CLIENTS_ERROR = 'CLIENTS_ERROR';

export const logoutRequest = token => {
	return {
		type: LOGOUT_REQUEST,
		payload: token
	};
};

export const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};

export const logoutError = error => {
	return {
		type: LOGOUT_ERROR,
		payload: error
	};
};

export const loginRequest = credentials => {
	return {
		type: LOGIN_REQUEST,
		payload: credentials
	};
};

export const loginSuccess = token => {
	return {
		type: LOGIN_SUCCESS,
		payload: token
	};
};

export const loginError = error => {
	return {
		type: LOGIN_ERROR,
		payload: error
	};
};

export const clientsRequest = token => {
	return {
		type: CLIENTS_REQUEST,
		payload: token
	};
};

export const clientsSuccess = clients => {
	return {
		type: CLIENTS_SUCCESS,
		payload: clients
	};
};

export const clientsError = error => {
	return {
		type: CLIENTS_ERROR,
		payload: error
	};
};
