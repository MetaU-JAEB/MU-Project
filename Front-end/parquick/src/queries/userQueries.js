//
import { gql } from '@apollo/client';
import User from '../types/User'



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

// mutation for register a new user
export const USER_REGISTER = (user : User) => {
    return gql`
    mutation userRegister{
        userRegister(
            email: "${user.email}",
            password: "${user.password}",
            type: "${user.type}",
            firstName: "${user.firstName}",
            lastName: "${user.lastName}"
        ) {
          record {
            email
            password
            firstName
            lastName
          }
          recordId
        }
      }
    `
}
