const { Server } = require("socket.io");

const io = new Server(8900, {
    /* options */
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    // Todo: everything
    console.log("user connected")
    io.emit("welcome","Hello, this is a hello world message")
});
