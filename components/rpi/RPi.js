import connectServer from "./ConnectServer.js";
import receiveRpi from "./ReceiveRPi.js";
import sendRpi from "./SendRPi.js";

rpi();

async function rpi() {
  let channel = await connectServer();
  receiveRpi(channel);
  sendRpi(channel);
}
