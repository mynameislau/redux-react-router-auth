import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { MainReducer } from './redux/main';
import './App.css';

const store = createStore(MainReducer);

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Route path="/login" component={Login} />
						<AuthenticatedRoute>
							<Route exact path="/" component={() => <span>Accueil</span>} />
							<Route path="/secretStuff" component={Login} />
						</AuthenticatedRoute>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
