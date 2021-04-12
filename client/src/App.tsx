import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';
import Root from './Root';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Root />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
