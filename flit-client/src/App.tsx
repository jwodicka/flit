import React from 'react';
import logo from './hummingbird.svg';
import Conversation from './Conversation';
import {Account} from './types';
import './App.css';

const TEST_USER:Account = {
  name: 'Test User'
}

const SECOND_USER:Account = {
  name: 'Second User'
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img height={200} width={200} src={logo} className="App-logo" alt="logo" />
        <p>
          Flit begins here.
        </p>
        <Conversation
        title={'A Conversational Space'}
          messages={[
            {
              source: TEST_USER,
              content: 'This is a line of dialogue as might be seen in a channel.',
              timestamp:new Date('2020-02-20T12:34Z').valueOf()
            },
            {
              source:SECOND_USER,
              content: 'This is a longer line of dialogue that someone who is very wordy might want to type into a channel and will lead to some word wrapping in a typical client. Have an emoji. 🍱',
              timestamp:new Date('2020-02-20T12:34Z').valueOf()
            }
          ]}
        />
      </header>
    </div>
  );
}

export default App;
