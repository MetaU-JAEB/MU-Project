// @flow
import * as React from 'react'
import Conversation from './Conversation/Conversation';
import './Messenger.css';

function Messenger () : React.MixedElement {
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
              chat-box
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
