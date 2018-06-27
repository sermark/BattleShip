import * as React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Main from './components/main';
import configureStore from './redux/configureStore';

const store = configureStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
