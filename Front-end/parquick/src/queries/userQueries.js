//
import { gql } from '@apollo/client';



// Mutation login
export const USER_LOGIN = (email : string, password : string) => {
    return gql`
    mutation UserLogin{
        userLogin(
             email: "${email}",
             password: "${password}"
        ) {
          record {
            _id
            type
            firstName
            lastName
            email
            password
            token
          }
          recordId
        }
      }
    `;
}
