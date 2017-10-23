const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

const isAuthorized = req => {
	console.log(req.path);

	if (/^\/auth\/?$/.test(req.path)) {
		return 'ok';
	}

	if (/^\/logout\/?$/.test(req.path)) {
		return 'ok';
	}

	console.log('check authorization');

	/*
	 * if (/(GET)/.test(req.method)) {
	 *   return true;
	 * }
	 */

	if (!req.headers.authorization) {
		return 'noHeader';
	}

	console.log(req.headers.authorization);

	const encoded = req.headers.authorization.split(' ')[1];
  const decoded = new Buffer(encoded, 'base64').toString('utf8');
  console.log(decoded);
	const id = decoded.split(':')[0];

	return id === 'oui' ? 'ok' : 'ko';
};

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

server.use(middlewares);
server.use((req, res, next) => {
	try {
		const authorized = isAuthorized(req);
		if (authorized === 'ok') {
			next();
		}
		else if (authorized === 'ko') {
			res.sendStatus(403);
		}
		else {
			res.sendStatus(401);
		}
	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Add custom routes before JSON Server router
server.post('/logout', (req, res) => {
	res.json({
		success: true
	});
});

server.post('/auth', (req, res) => {
	console.log(req.body);

	if (req.body.user === 'admin' && req.body.password === 'admin') {
		res.json({
			success: true,
			data: {
				token: 'oui'
			}
		});
	}
	else {
		res.json({
			success: false,
			data: {
				message: 'mauvais identifiants'
			}
		});
	}
});

server.post('/auth-test', (req, res) => {
	console.log(req.headers.authorization);
	const encoded = req.headers.authorization.split(' ')[1];
	const decoded = new Buffer(encoded, 'base64').toString('utf8');

	res.json({
		id: decoded.split(':')[0],
		secret: decoded.split(':')[1]
	});
});

server.use(router);
server.listen(3200, () => {
	console.log('JSON Server is running 3200');
});
