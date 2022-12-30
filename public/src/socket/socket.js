import { io } from "socket.io-client";

let socket;
const URL = "http://localhost:8080/"
socket = io(URL, { autoConnect: false, transports: ['websocket'], withCredentials: true});

export default socket