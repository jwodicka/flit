import React from 'react';
import logo from './hummingbird.svg';
import DialogLine from './DialogLine';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img height={200} width={200} src={logo} className="App-logo" alt="logo" />
        <p>
          Flit begins here.
        </p>
        <DialogLine
          name='Test User'
          line='This is a line of dialogue as might be seen in a channel.'
          timestamp={new Date('2020-02-20T12:34Z')}
        />
        <DialogLine
          name='Second User With A Much Longer Name'
          line='This is a longer line of dialogue that someone who is very wordy might want to type into a channel and will lead to some word wrapping in a typical client. Have an emoji. 🍱'
          timestamp={new Date('2020-02-20T12:34Z')}
        />
      </header>
    </div>
  );
}

export default App;
