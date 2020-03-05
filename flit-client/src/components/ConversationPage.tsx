import React from 'react';
import { Link } from 'react-router-dom';
import DialogLine from './DialogLine';
import logo from './hummingbird.svg';
import send from "./send.svg";
import './ConversationPage.css';

// Grabbed some dialogue lines from "Captain Ben's Choice", here:
// https://dev.gutenberg.org/files/15585/15585-h/15585-h.htm
import lines from "./demoConversation1.json";

// Quick-and-dirty tool for annotating randomish ascending timestamps to a conversation so we don't
// need them in the JSON file.
const getNextTime = (() => {
  let currTime = new Date('1870-03-20T02:04Z');
  return () => {
    const oldTime = currTime;
    // Increment the time by up to five minutes.
    currTime = new Date(currTime.valueOf() + (Math.random() * (1000 * 60 * 5)))
    return oldTime;
  }
})()

// Build a pile of lines from the example file, then append the existing special-case demo lines.
const timedLines = lines.map((line) => ({...line, timestamp: getNextTime()}));
timedLines.push({
  name: 'Test User',
  line: 'This is a line of dialogue as might be seen in a channel.',
  timestamp: new Date('2020-02-20T12:34Z'),
});
timedLines.push({
  name: 'Second User With A Much Longer Name',
  line: 'This is a longer line of dialogue that someone who is very wordy might want to type into a channel and will lead to some word wrapping in a typical client. Have an emoji. 🍱',
  timestamp: new Date('2020-02-20T12:34Z'),
});

function ConversationPage() {
  return (
    <div className="ConversationPage">
      <div className="ConversationInfo">
        <Link to="/"><img height={50} width={50} src={logo} className="homeButton" alt="home" /></Link>
        <span className="ConversationName">Example Conversation</span>
      </div>
      <div className="Conversation">
        <div className="Lines">
          {timedLines.map(({name, line, timestamp}, idx) => (
            <DialogLine
              key={line}
              name={name}
              line={line}
              timestamp={timestamp}
            />
          ))}
        </div>
      </div>
      <div className="InputBox">
        <textarea placeholder="Message" rows={1}></textarea>
        <img height={30} width={30} src={send} className="sendButton" alt="send" />
      </div>
    </div>
  );
}

export default ConversationPage;
