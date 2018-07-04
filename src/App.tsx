import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import './App.css';
import Main from './components/main';
import configureStore from './redux/configureStore';
import { IStoreState } from './types/index';

const store: Store<IStoreState> = configureStore();

const App: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
