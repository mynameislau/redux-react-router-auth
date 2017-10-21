import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { Header } from './components/Header';
import { MainReducer } from './redux/main-reducer';
import './App.css';
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(MainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Header />
						<Route path="/login" component={Login} />
						<AuthenticatedRoute>
							<Route path="/" component={() => <span>Accueil</span>} />
							<Route path="/secretStuff" component={Login} />
						</AuthenticatedRoute>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
