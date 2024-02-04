import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MgContext from './components/MgContext';
import GlobalStyles from './components/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<MgContext>
		<GlobalStyles />
		<App />
	</MgContext>
);