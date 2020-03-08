import React from 'react';
import { Link } from 'react-router-dom';
import DialogLine from '../DialogLine/';
import logo from '../hummingbird.svg';
import send from "./send.svg";
import './styles.css';
import { MSGSTATUS } from 'exportedConstants';
import { FlitUser, FlitMessage } from 'exportedTypes';

// Grabbed some dialogue lines from "Captain Ben's Choice", here:
// https://dev.gutenberg.org/files/15585/15585-h/15585-h.htm
import lines from "./demoConversation1.json";

const loggedInUser:FlitUser = {
  uid: 1,
  avatar: '',
  name: 'Not an actual logged-in user'
}

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

// Generate sequential IDs from test data names
const generateId = (() => {
  let nextId = 0
  let ids:{[index: string]:number} = {}

  return (name:string) => {
    if (!ids.hasOwnProperty(name)) ids[name] = nextId++
    return ids[name]
  }
})()

// generated Status field based on message origin matching current user
const generateStatus = (line:{[index: string]:any}) => {
  if (line.uid === loggedInUser.uid) return Math.random() < 0.5 ? MSGSTATUS.PENDING : MSGSTATUS.SENT 
  else return MSGSTATUS.RECEIVED
}

// pick out avatars per-user where they exist
const generateAvatar = (line:{[index: string]:any}) => {
  return line.uid < 3 ? `user${line.uid}.svg` : ""
}

// split out bits of final 'line' to match exported types
const extractUser = (line:{[index: string]:any}):FlitUser => {
  console.log(line)
  return {
    uid: line.uid,
    avatar: line.avatar,
    name: line.name
  }
}

const extractMessage = (() => {
  let nextId = 0
  return (line:{[index: string]:any}):FlitMessage => {
    return {
      mid: nextId++,
      content: line.line,
      uid: line.uid,
      timestamp: line.timestamp
    }
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

// add any autogenerated fields and process into final format
const finalLines = timedLines
  .map((line) => ({...line, uid: generateId(line.name)}))
  .map((line) => ({...line, avatar: generateAvatar(line)}))
  .map((line) => ({user: extractUser(line), msg: extractMessage(line), msgStatus: generateStatus(line)}))

export default function render() {
  return (
    <div className="ConversationPage">
      <div className="ConversationInfo">
        <Link to="/"><img height={50} width={50} src={logo} className="homeButton" alt="home" /></Link>
        <span className="ConversationName">Example Conversation</span>
      </div>
      <div className="Conversation">
        <div className="Lines">
          {finalLines.map(({user, msg, msgStatus}) => (
            <DialogLine
              user={user}
              msg={msg}
              key={msg.mid}
              own={user.uid === loggedInUser.uid}
              msgStatus={msgStatus}
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
