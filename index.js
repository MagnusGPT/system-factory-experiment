const { Server } = require("socket.io");
const { connect } = require("socket.io-client");
const io = new Server(3000);

/*
List of signals:
setPoints: sets amount of points of the emitted socket
addPoints: adds points to the emitted socket
*/

let amountOfConnections = 0;
let sockets = {};
let threshold = 100;
io.on("connection", (socket) => {
    console.log("Someone connected");
    amountOfConnections++;
    sockets[socket.id] = { balance: 0 };
    console.log(sockets);
    socket.on("checkPoints", (pointAmount) => {
        if (pointAmount > threshold) {
            socket.emit("setPoints", 0);
            sockets[socket.id].balance = 0;
            console.log(`Socket ${socket.id} surpassed the threshold. Their points set to 0.`);
        }
        else {
            sockets[socket.id].balance = pointAmount;
        }
    });

    socket.on("disconnect", () => {
        amountOfConnections--;
        console.log(`Socket ${socket.id} disconnected. Sharing their points between others.`);
        sharedAmount = Math.floor(sockets[socket.id].balance / amountOfConnections);
        if (amountOfConnections === 0) { 
            console.log("No connections left."); 
        }
        else {
            io.emit("addPoints", sharedAmount)
            console.log(`Everyone received ${sharedAmount}.`);
        }
        sockets[socket.id].balance = 0;
    });
});

// Sends a call to check coins.
setInterval(() => {
    io.emit("checkPoints");
}, 100);

let pointEmitted = 1;

// Emit points.
setInterval(() => {
    io.emit("addPoints", pointEmitted);
    console.log(`${pointEmitted} amount of points emitted.`);
}, 1000);