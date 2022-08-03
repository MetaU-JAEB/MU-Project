const { Server } = require("socket.io");

const FRONT_END_URL = "http://localhost:3000";
const SOCKET_SERVER_PORT = 8900;

const io = new Server(SOCKET_SERVER_PORT, {
    /* options */
    cors: {
        origin: FRONT_END_URL,
    },
});

let connectedUsers = [];

const addUserToConnected = (userId, socketId) => {
    if(!connectedUsers.some((user) => user.userId === userId)){
        connectedUsers.push({ userId, socketId });
    }
};


io.on("connection", (socket) => {

    // when a connection happens

    // add listener to event 'addUser'
    // take userId and socketId from user
    // publish the list of connected users
    socket.on("addUserToConnected", (userId) => {
        addUserToConnected(userId, socket.id);
        io.emit("getConnectedUsers", connectedUsers);
    });

});
