//

import { gql } from '@apollo/client';


// Getting queries for a certain user
export const GET_MESSAGES_FROM_THIS_CONVERSATION = (conversationId: string) => {
    return gql`
    query MessageMany{
        messageMany(filter:  {
          conversationId: "${conversationId}"
        }) {
          _id
          conversationId
          text
          createdAt
          senderId
          sender {
            firstName
            lastName
            type
            _id
          }
        }
      }
`};


export const CREATE_MESSAGE_FROM_USER_TO_CONVERSATION =
 (conversationId: string, text: string, senderId: string) => {
    return gql`
    mutation MessageCreate2 {
        messageCreate(record:  {
          conversationId: "${conversationId}",
          text: "${text}",
          senderId: "${senderId}"
        }) {
          record {
            conversationId
            text
            sender {
              _id
              firstName
              lastName
              type
            }
          }
        }
      }
`};
