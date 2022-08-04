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
    if (!connectedUsers.some((user) => user.userId === userId)) {
        connectedUsers.push({ userId, socketId });
    }
};

const getUser = (userId) => {
    return connectedUsers.find((user) => user.userId === userId);
};

const removeUserFromConnected = (socketId) => {
    connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};


io.on("connection", (socket) => {

    // when a connection happens

    // add listener to order add-user
    // take userId from user
    // publish the list of connected users
    socket.on("user:add-to-connected-list", (userId) => {
        addUserToConnected(userId, socket.id);
        io.emit("user:get-connected-list", connectedUsers);
    });

    //send and get message
    socket.on("message:send", ({ senderId, receiverId, text }) => {
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("message:get", {
            senderId,
            text,
        });
    });


    // disconnection
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("user:get-connected-list", connectedUsers);
    });

});
