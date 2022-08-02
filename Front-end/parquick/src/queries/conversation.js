//

import { gql } from '@apollo/client';

const otherUserType = { "driver": "owner", "owner": "driver" }

// Getting queries for a certain user
export const GET_MY_CONVERSATIONS = (userType: string, userId: string) => {
    return gql`
query MyConversations{
    conversationMany(filter: {
      ${userType}Id: "${userId}"
    }) {
      user : ${otherUserType[userType]} {
        firstName
        lastName
      }
      _id
    }
  }
`};
