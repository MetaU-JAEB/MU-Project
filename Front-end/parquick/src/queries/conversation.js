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
        _id
        firstName
        lastName
      }
      _id
    }
  }
`};

export const CREATE_CONVERSATION = (driverId: string, ownerId: string) => {
  return gql`
  mutation ConversationCreate{
    conversationCreate(record: {
      ownerId: "${ownerId}",
      driverId: "${driverId}"
    }) {
      record {
        driver {
          _id
          firstName
          lastName
        }
        owner {
          _id
          firstName
          lastName
        }
        _id
      }
    }
  }
`};
