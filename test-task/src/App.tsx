import * as React from 'react';
import './App.css';
import BattleShip from './components/battleField';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <BattleShip status='field' />
    );
  }
}

export default App;
