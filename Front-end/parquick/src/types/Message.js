// @flow

export type Message = {
    _id? : string,
    senderId : string,
    text : string,
    createdAt? : string
}

export const testMessages = [
    { text : "Hello", senderId:"12345" },
    { text : "These", senderId:"11111" },
    { text : "are", senderId:"11111" },
    { text : "test", senderId:"12345" },
    { text : "messages", senderId:"11111" },
    { text : `"laaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeee
    laaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeee
    laaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeeelaaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeeelaaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeeelaaaaaaaaaarrrrrgeeeeeeeeeeee
    eeeeee"`, senderId:"11111" },
]
