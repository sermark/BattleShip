import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './components/main';
import configureStore from './redux/configureStore';
// import { IStoreState } from './types/index';

const store = configureStore();

const App: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
