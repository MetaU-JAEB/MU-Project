// @flow
import * as React from 'react'
import { useEffect, useState } from "react";
import { useUser } from '../../contexts/UserContext';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import { client } from '../../queries/client';
import { GET_MY_CONVERSATIONS } from '../../queries/conversation';
import type { User } from "../../types/User";
import { GET_MESSAGES_FROM_THIS_CONVERSATION } from '../../queries/message';

function Messenger(): React.MixedElement {

    const { user } = useUser < User > ();
    const [newMessage, setNewMessage] = useState("");
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Todo : store the message
    };

    // Fetching conversations for the user
    useEffect(() => {
        if (user?.type && user?._id) {
            client
                .query({
                    query: GET_MY_CONVERSATIONS(user.type.toLowerCase(), user._id),
                })
                .then((result) => {
                    setConversations(result.data.conversationMany)
                });
        }
    }, [])

    // Getting the messages fro the current chat
    useEffect(() => {
        if (currentChat._id) {
            client
                .query({
                    query: GET_MESSAGES_FROM_THIS_CONVERSATION(currentChat._id),
                })
                .then((result) => {
                    setMessages(result.data.messageMany)
                });
        }

    }, [currentChat]);


    return (
        <>
            <div className="messenger">
                <div className="chat-menu">

                    <div className="chat-menu-container">
                        <h3 className='conversations-title'>Conversations</h3>
                        {conversations.map((conv) => {
                            return <div onClick={() => setCurrentChat(conv)} key={conv._id}>
                                <Conversation conversation={conv} />
                            </div>

                        })}
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box-container">
                        {currentChat?._id ?
                            <>
                                {messages?.length !== 0 ?
                                    <div className="chatbox-messages">
                                        {
                                            messages.map((mes) => {
                                                return <Message message={mes} own={user._id === mes.senderId} key={mes._id} />
                                            })
                                        }
                                    </div>
                                    :
                                    <>
                                        <span className="no-chatted-before">
                                            {`V`} Send the first message. {`V`}
                                        </span>
                                    </>}
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
                            </>
                            :
                            <>
                                <span className="no-chat-selected">
                                    {`<==`} Open a conversation to start a chat.
                                </span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
