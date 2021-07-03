import React from 'react';
import App from './components/App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const appDiv = document.getElementById('app');
ReactDOM.render(
	<BrowserRouter>
		<App></App>
	</BrowserRouter>,
	appDiv
);

if (module.hot) {
	module.hot.accept();
}
