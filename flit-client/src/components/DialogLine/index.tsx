import React from 'react';
import face from './face.svg';
import './styles.css';
import LineStatus from 'components/LineStatus';

type Props = {
    id: number,
    avatar: string,
    name: string,
    line: string,
    timestamp: Date,
    own: boolean,
    status: string,
}

function makeTimestamp(stamp: Date):string {
    const now = new Date();

    const dayString = stamp.toDateString() === now.toDateString() ?
        'Today' : stamp.toLocaleDateString();
    const timeString = stamp.toLocaleTimeString();

    return `${dayString} at ${timeString}`
}

export default function render(props: Props) {
    let admin:boolean = true
    let classNames:string = props.own ? "name ownName": "name"

    let avatar:string = props.avatar && props.avatar !== undefined ? props.avatar : face 

    return <div className='dialogLine'>
        <div className='face'>
            <img src={avatar} width={32} height={32} alt=''/>
        </div>
        <div className={classNames}>
            {props.name}
        </div>
        <div className='timestamp'>
            {(props.own || admin) && <LineStatus status={props.status} />}
            {makeTimestamp(props.timestamp)}
        </div>
        <div className='line'>
            {props.line}
        </div>
    </div>
}