import React from 'react';
import { Link } from 'react-router-dom';
import DialogLine from './DialogLine';
import logo from './hummingbird.svg';
import send from "./send.svg";
import './ConversationPage.css';

function ConversationPage() {
  return (
    <div className="ConversationPage">
      <div className="ConversationInfo">
        <Link to="/"><img height={50} width={50} src={logo} className="homeButton" alt="home" /></Link>
        <span className="ConversationName">Example Conversation</span>
      </div>
      <div className="Conversation">
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
      </div>
      <div className="InputBox">
        <textarea placeholder="Message" rows={1}></textarea>
        <img height={30} width={30} src={send} className="sendButton" alt="send" />
      </div>
    </div>
  );
}

export default ConversationPage;
