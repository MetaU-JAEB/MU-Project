// @flow
import * as React from 'react'
import './Conversation.css';

function Conversation(): React.MixedElement {
    return <>
        <div className="conversation">
            <img
                className="conversation-img"
                src="https://picsum.photos/id/222/408/485"
                alt="Other Profile"
            />
            <span className="conversation-name">{"Jose Angel"}</span>
        </div>
    </>
}

export default Conversation;
