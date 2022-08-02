// @flow
import * as React from 'react'
import { useEffect, useState } from "react";
import { useUser } from '../../contexts/UserContext';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import { testMessages } from "../../types/Message";
import { client } from '../../queries/client';
import { GET_MY_CONVERSATIONS } from '../../queries/conversation';
import type { User } from "../../types/User";

function Messenger(): React.MixedElement {

    const { user } = useUser < User > ();
    const [newMessage, setNewMessage] = useState("");
    const [conversations, setConversations] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Todo : store the message
    };

    useEffect(() => {
        if (user?.type && user?._id) {
            client
                .query({
                    query: GET_MY_CONVERSATIONS(user.type.toLowerCase(), user._id),
                })
                .then((result) => {

                    // TODO: update the conversations
                    setConversations(result.data.conversationMany)
                });
        }
    }, [])


    return (
        <>
            <div className="messenger">
                <div className="chat-menu">

                    <div className="chat-menu-container">
                        <h3 className='conversations-title'>Conversations</h3>
                        {conversations.map((conv) => {
                            return <Conversation conversation={conv} key={conv._id} />
                        })}
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
