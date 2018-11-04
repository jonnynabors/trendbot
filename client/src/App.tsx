import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getRankingsForCharacter } from './api/Network';

class App extends Component {

  async componentWillMount() {
    try {
      const rankings = await(getRankingsForCharacter('corrupting'));
      console.log(rankings);
    }
    catch(err) {
      console.log('something went wrong');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
