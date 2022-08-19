// @flow
import * as React from 'react';
import type { Conversation as ConvType } from '../../../types/Conversation';
import './Conversation.css';

type PropsConversation = {
  conversation: ConvType,
  isSelected: boolean,
};

function Conversation({
  conversation,
  isSelected,
}: PropsConversation): React.MixedElement {
  return (
    <div className={isSelected ? 'conversation selected' : 'conversation'}>
      <img
        className="conversation-img"
        src="https://picsum.photos/id/222/408/485"
        alt="Other Profile"
      />
      <span className="conversation-name">{`${conversation.user.firstName} ${
        conversation.user.lastName
      }, ${new Date(conversation.createdAt).toLocaleDateString()}`}</span>
    </div>
  );
}

export default Conversation;
