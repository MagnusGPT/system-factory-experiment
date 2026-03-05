const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");


let point = 0;
socket.on("addPoints", (receivedPoint) => {
    point += receivedPoint;
    console.log(`Your point is now ${point}`);
});

socket.on("checkPoints", () => {
    socket.emit("checkPoints", point);
});

socket.on("setPoints", (pointAmount) => {
    point = pointAmount;
    console.log(`Points are set to ${pointAmount}`);
});