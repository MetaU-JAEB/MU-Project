// @flow
import * as React from 'react'
import { useState } from "react";
import { useUser } from '../../contexts/UserContext';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import { testMessages } from "../../types/Message";

function Messenger(): React.MixedElement {

    const { user } = useUser();
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Todo : store the message
    };


    return (
        <>
            <div className="messenger">
                <div className="chat-menu">
                    <div className="chat-menu-container">
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box-container">
                        <div className="chatbox-messages">
                            {
                                testMessages.map((mes) => {
                                    return <Message message={mes} own={user._id === mes.senderId} key={mes._id} />
                                })
                            }
                        </div>
                        <div className="chatbox-input">
                            <textarea
                                className="chat-message-input"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button className="chat-submit-button" onClick={handleSubmit}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
