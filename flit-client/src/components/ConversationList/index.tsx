import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'hummingbird.svg';
import './styles.css';
import {FlitConversation} from 'exportedTypes';

type Props = {
    conversations: FlitConversation[]
}

export default function render(props: Props) {
    return <div className='conversationList'>
        {
        props.conversations.map((conversation:FlitConversation) =>
            <div>
                <Link to={`/conversation/${conversation.cid}`}>{conversation.title}</Link> [ {conversation.emojiTag} ] {conversation.members.join(',')} 
            </div>
        )}
    </div>
}