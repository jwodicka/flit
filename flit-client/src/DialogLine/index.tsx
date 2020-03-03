import React from 'react';
import face from '../face.svg';
import {Message} from '../types';
import './DialogLine.css';

type Props = {
    message: Message,
}

function makeTimestamp(stamp: Date):string {
    const now = new Date();

    const dayString = stamp.toDateString() === now.toDateString() ?
        'Today' : stamp.toLocaleDateString();
    const timeString = stamp.toLocaleTimeString();

    return `${dayString} at ${timeString}`
}

export default function render(props: Props) {
    return <div className='dialogLine'>
        <div className='face'>
            <img src={face} width={32} height={32} alt=''/>
        </div>
        <div className='name'>
            {props.message.source?.name || '(unknown)'}
        </div>
        <div className='timestamp'>
            {makeTimestamp(new Date(props.message.timestamp))}
        </div>
        <div className='line'>
            {props.message.content}
        </div>
    </div>
}