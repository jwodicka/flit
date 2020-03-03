import React from 'react';
import {Message} from '../types';
import DialogLine from '../DialogLine';
import './Conversation.css';

type Props = {
    messages: Array<Message>,
    title: string
};

export default function render(props: Props) {
    return (
        <>
            <div className='header'>
                {props.title}
            </div>
            <div className='conversation'>
                {
                    props.messages.map(
                        (msg) => <DialogLine message={msg} />
                    )
                }
            </div>
        </>
    )
}