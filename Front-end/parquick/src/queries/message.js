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
