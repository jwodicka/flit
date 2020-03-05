import React from 'react';
import face from './face.svg';
import './styles.css';

type Props = {
    // avatar: HTMLElement, // unused for now
    name: string,
    line: string,
    timestamp: Date,
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
            {props.name}
        </div>
        <div className='timestamp'>
            {makeTimestamp(props.timestamp)}
        </div>
        <div className='line'>
            {props.line}
        </div>
    </div>
}