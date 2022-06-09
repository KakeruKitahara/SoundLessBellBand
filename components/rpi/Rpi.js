import connectServer from "./ConnectServer.js";
import receiveRpi from "./ReceiveRpi.js";
import sendRpi from "./SendRpi.js";

rpi();

async function rpi(){
let channel = await connectServer();
receiveRpi(channel);
sendRpi(channel);
};