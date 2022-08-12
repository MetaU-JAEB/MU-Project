// @flow
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useUser } from '../../contexts/UserContext';
import Conversation from './Conversation/Conversation';
import Message from './Message/Message';
import './Messenger.css';
import { client } from '../../queries/client';
import { GET_MY_CONVERSATIONS } from '../../queries/conversation';
import type { User } from '../../types/User';
import {
  CREATE_MESSAGE_FROM_USER_TO_CONVERSATION,
  GET_MESSAGES_FROM_THIS_CONVERSATION,
} from '../../queries/message';
import { SOCKET_SERVER_URL } from '../../utils/constants';

function Messenger(): React.MixedElement {
  const { conversationId } = useParams();
  const { user } = useUser<User>();
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRefChat = useRef(null);
  const scrollRefConv = useRef([]);

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL);
    /* Listener to order/event get-message */
    socket.current.on('message:get', data => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: data.createdAt,
        _id: data._id,
      });
    });
  }, []);

  /**
   * Displaying new message if it is for me
   * and comes from the current conversation
   */
  useEffect(() => {
    if (arrivalMessage) {
      if (arrivalMessage.senderId == currentConversation.user._id) {
        setMessages(prev => {
          return [...prev, arrivalMessage];
        });
      }
    }
  }, [arrivalMessage, currentConversation]);

  /* Fetching conversations for the user */
  useEffect(() => {
    if (user?.type && user?._id) {
      client
        .query({
          query: GET_MY_CONVERSATIONS(user.type.toLowerCase(), user._id),
        })
        .then(result => {
          setConversations(result.data.conversationMany);
        });
    }
  }, []);

  useEffect(() => {
    if (conversationId !== '' && conversations) {
      setCurrentConversation(
        conversations.find(conv => conv._id == conversationId) || {},
      );
    }
  }, [conversations, conversationId]);

  /* sending user info to socket server */
  useEffect(() => {
    if (user?._id && socket.current) {
      socket.current.emit('user:add-to-connected-list', user._id);
    }
  }, [user, socket]);

  /* Getting the messages fro the current chat */
  useEffect(() => {
    if (!currentConversation?._id) return;

    setIsLoadingMessages(true);
    client
      .query({
        query: GET_MESSAGES_FROM_THIS_CONVERSATION(currentConversation._id),
      })
      .then(result => {
        setMessages(result.data.messageMany);
        setIsLoadingMessages(false);
      });
  }, [currentConversation]);

  useEffect(() => {
    scrollRefChat.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (currentConversation?._id) {
      scrollRefConv.current[currentConversation?._id]?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [currentConversation]);

  const sendToSocketServer = messageRecord => {
    const receiverId = currentConversation?.user._id;
    socket.current?.emit('message:send', {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
      _id: messageRecord._id,
      createdAt: messageRecord.createdAt,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (currentConversation?._id && user?._id && messages !== '') {
      client
        .mutate({
          mutation: CREATE_MESSAGE_FROM_USER_TO_CONVERSATION(
            currentConversation._id,
            newMessage,
            user._id,
          ),
        })
        .then(result => {
          setMessages(prev => {
            return [...prev, result.data.messageCreate.record];
          });
          sendToSocketServer(result.data.messageCreate.record);
          setNewMessage('');
        });
    }
  };

  return (
    <div className="messenger">
      <div className="chat-menu">
        <div className="chat-menu-container">
          <h3 className="conversations-title">Conversations</h3>
          {conversations
            .map(conv => {
              return (
                <div
                  onClick={() => setCurrentConversation(conv)}
                  key={conv._id}
                  ref={elem => (scrollRefConv.current[conv._id] = elem)}
                >
                  <Conversation
                    conversation={conv}
                    isSelected={
                      currentConversation?._id &&
                      currentConversation?._id === conv._id
                    }
                  />
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-box-container">
          {currentConversation?._id ? (
            <>
              {isLoadingMessages ? (
                <span className="loading-messages">Loading messages ...</span>
              ) : messages?.length !== 0 ? (
                <div className="chat-box-messages">
                  {messages.map(mes => {
                    return (
                      <div ref={scrollRefChat} key={mes._id}>
                        <Message
                          message={mes}
                          own={user._id === mes.senderId}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="no-chatted-before">
                  {`V`} Send the first message. {`V`}
                </span>
              )}
              <div className="chat-box-input">
                <textarea
                  className="chat-message-input"
                  placeholder="write something..."
                  onChange={e => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button
                  className={
                    newMessage !== ''
                      ? 'chat-submit-button'
                      : 'chat-submit-button no-message'
                  }
                  onClick={handleSubmit}
                  disabled={newMessage == '' ? true : false}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="no-chat-selected">
              {`<==`} Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messenger;
