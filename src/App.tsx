import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './containers/containerMain';
import { store } from './redux/configureStore';


const App: React.SFC = (): JSX.Element => {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

export default App;
