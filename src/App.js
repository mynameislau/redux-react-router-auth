import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { mainReducer } from './redux/main-reducer';
import './App.css';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { mainSaga } from './redux/sagas';
import { Content } from './components/Content';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(
	mainReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mainSaga);

class App extends Component {
	render () {
		return (
			<Provider store={store} className="bla">
				<BrowserRouter className="bli">
					<Content />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
