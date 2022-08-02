// @flow
import * as React from 'react'
import './Message.css';
import type {Message as MessageType}  from '../../../types/Message'
import { format } from "timeago.js";

type PropsMessage = {
    message : MessageType,
    own : boolean
}


function Message({ message, own } : PropsMessage): React.MixedElement {
    return <>
        <div className={own ? "message own" : "message"}>
            <div className="message-container">
                <img
                    className="message-img"
                    src="https://picsum.photos/id/222/408/485"
                    alt="profile pic"
                />
                <p className="message-text">{message.text}</p>
            </div>
            <div className="message-date">{format(message.createdAt)}</div>
        </div>
    </>
}

export default Message;
