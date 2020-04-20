import React from 'react';
import './styles.css';
import { MSGSTATUS } from 'exportedConstants';

type Props = {
    status: string
}

export default function render(props: Props) {
    switch(props.status) {
        case MSGSTATUS.RECEIVED:
            return <React.Fragment>
                &lt;&lt;
                </React.Fragment>
        case MSGSTATUS.SENT:
            return <React.Fragment>
                &gt;&gt;
                </React.Fragment>
        case MSGSTATUS.PENDING:
            return <React.Fragment>
                ...
                </React.Fragment>
        default:
            return <React.Fragment>???</React.Fragment>
    }
}