import React from 'react';
import './styles.css';
import { STATUS } from 'stringConstants';

type Props = {
    status: string
}

export default function render(props: Props) {
    switch(props.status) {
        case STATUS.RECEIVED:
            return <span className="lineActionButton">
                &lt;&lt;
                </span>
        case STATUS.SENT:
            return <span className="lineActionButton">
                &gt;&gt;
                </span>
        case STATUS.PENDING:
            return <span className="lineActionButton">
                ...
                </span>
        default:
            return <span>???</span>
    }
}