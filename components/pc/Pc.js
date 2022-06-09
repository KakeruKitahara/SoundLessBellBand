import connectServer from "./ConnectServer.js";
import receivePc from "./ReceivePc.js";
import sendPc from "./SendPc.js";

pc();

async function pc() {
  let channel = await connectServer();
  receivePc(channel);
  sendPc(channel);
};