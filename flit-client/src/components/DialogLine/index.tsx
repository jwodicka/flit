import React from 'react';
import './styles.css';
import {FlitUser, FlitMessage} from 'exportedTypes';
import LineStatus from 'components/LineStatus';

type Props = {
    user: FlitUser,
    msg: FlitMessage,
    msgStatus: string,
    own: boolean,
}

const avatarBase:string = `${process.env.PUBLIC_URL}/avatars`

function makeTimestamp(stamp: Date):string {
    const now = new Date();

    const dayString = stamp.toDateString() === now.toDateString() ?
        'Today' : stamp.toLocaleDateString();
    const timeString = stamp.toLocaleTimeString();

    return `${dayString} at ${timeString}`
}

export default function render(props: Props) {
    let classNames:string = props.own ? "name ownName": "name"

    console.log(props.user.avatar)
    let avatar:string = props.user.avatar && props.user.avatar !== undefined && props.user.avatar !== "" ? `${avatarBase}/${props.user.avatar}` : `${avatarBase}/face.svg` 

    return <div className='dialogLine'>
        <div className='face'>
            <img src={avatar} width={32} height={32} alt=''/>
        </div>
        <div className={classNames}>
            {props.user.name}
        </div>
        <div className='status'>
            <LineStatus status={props.msgStatus} />
        </div>
        <div className='timestamp'>
            {makeTimestamp(props.msg.timestamp)}
        </div>
        <div className='line'>
            {props.msg.content}
        </div>
    </div>
}