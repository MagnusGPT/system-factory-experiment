const { Server } = require("socket.io");
const io = new Server(3000);

io.on("connection", (socket) => {
    console.log("Someone connected");
});

let pointEmitted = 1;
setInterval(() => {
    io.emit("addPoint", pointEmitted);
    console.log(`${pointEmitted} amount of points emitted.`);
}, 1000);