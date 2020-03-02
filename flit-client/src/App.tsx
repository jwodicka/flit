import React from 'react';
import logo from './hummingbird.svg';
import DialogLine from './DialogLine';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Flit begins here.
        </p>
        <DialogLine
          name='Test User'
          line='This is a line of dialogue as might be seen in a channel.'
          timestamp={new Date('2020-02-20T12:34Z')}
        />
      </header>
    </div>
  );
}

export default App;
