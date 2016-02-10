import React from 'react';
import { render } from 'react-dom';
import './global';
import App from './components/App';

const rootElement = document.querySelector('.root');
render(<App />, rootElement);

// Development hot reloading
if (module.hot) {
	module.hot.accept();
}
