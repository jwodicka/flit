import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../hummingbird.svg';
import './styles.css';
import ConversationList from 'components/ConversationList/';
import { FlitConversation } from 'exportedTypes';

const conversations:FlitConversation[] = [
  {
    emojiTag: ["\u{1F61D}", "\u{1F621}", "\u{1F680}"],
    title: 'Demo conversation',
    members: ['user0', 'user1', 'user12'],
    cid: 0,
  },
  {
    emojiTag: ["\u{1F61D}", "\u{1F621}", "\u{1F680}"],
    title: 'Another conversation',
    members: ['user0', 'user1', 'user12'],
    cid: 1,
  }
]

function LandingPage() {
  return (
      <div className="LandingPage">
          <img height={200} width={200} src={logo} className="Flit-logo" alt="logo" />
          <p>
            Flit begins here.
          </p>
          <ConversationList conversations={conversations} />
      </div>
  );
}

export default LandingPage;
