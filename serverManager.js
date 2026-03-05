const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

let command = "checkSockets";

setInterval(() => {
    socket.emit(command);
}, 1000);

socket.on(command, (info) => {
    console.log(info);
});