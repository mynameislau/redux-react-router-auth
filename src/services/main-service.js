export const login = credentials => {
	return fetch('http://localhost:3200/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			if (json.success) {
				localStorage.setItem('appToken', json.data.token);
				return json.data.token;
			}
			console.log('not success');
			return Promise.reject(json.data.message);
		});
};

export const logout = token => {
	localStorage.setItem('appToken', null);
	return fetch('http://localhost:3200/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'applicationi/json'
		},
		body: JSON.stringify({
			token
		})
	})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			return json;
		});
};
