let channel;

async function connectServer() {
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenIOT");
  console.log("open : chirimenIOT");

  return channel;
}


export default connectServer;