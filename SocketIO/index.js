const { Server } = require("socket.io");

const io = new Server(8900, { /* options */ });

io.on("connection", (socket) => {
    // Todo: everything
});
