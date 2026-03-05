const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");


let point = 0;
socket.on("addPoint", (receivedPoint) => {
    point += receivedPoint;
    console.log(`Your point is now ${point}`);
});