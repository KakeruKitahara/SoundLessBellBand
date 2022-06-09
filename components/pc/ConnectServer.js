let recieveData;
let channel;

async function connectServer() {
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenIOT");
  console.log("open : chirimenIOT");

  channel.onmessage = RecieveMsg;

  return {channel : channel, recieveData : recieveData};
}

function RecieveMsg(msg) {
  recieveData = JSON.parse(msg.data);
}

export default connectServer;