import * as React from 'react';
import './App.css';
// import BattleShip from './components/battleField';
import Main from './components/main';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Main />
      // <BattleShip status='field' />
    );
  }
}

export default App;
