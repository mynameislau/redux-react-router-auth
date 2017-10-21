const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

const isAuthorized = req => {
	console.log(req.path);

	if (/^\/auth\/?$/.test(req.path)) {
		return true;
	}

	console.log('check authorization');

	/*
	 * if (/(GET)/.test(req.method)) {
	 *   return true;
	 * }
	 */

	const encoded = req.headers.authorization.split(' ')[1];
	const decoded = new Buffer(encoded, 'base64').toString('utf8');
	const id = decoded.split(':')[0];

	return id === 'oui';
};

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

server.use(middlewares);
server.use((req, res, next) => {
	if (isAuthorized(req)) {
		// add your authorization logic here
		next(); // continue to JSON Server router
	}
	else {
		res.sendStatus(401);
	}
});

// Add custom routes before JSON Server router
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
