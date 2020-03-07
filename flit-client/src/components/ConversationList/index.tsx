import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'hummingbird.svg';
import './styles.css';

type Props = {
    emojiTag: HTMLElement,
    title: string,
    members: [string]
}

export default function render(props: Props) {
    return <div>
        {props.title} [ {props.emojiTag} ] {props.members.join(',')} 
    </div>
}