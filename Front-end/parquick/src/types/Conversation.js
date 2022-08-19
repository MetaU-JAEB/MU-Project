// @flow

// created conversation type
export type Conversation = {
  _id: string,
  user: {
    firstName: string,
    lastName: string,
  },
  createdAt : string
};
