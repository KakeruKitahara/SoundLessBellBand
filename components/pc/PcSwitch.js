// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;
var recieveData;

onload = async function () {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenSwitch");
	recieveData = JSON.parse(msg.data);

	console.log(`data from ${recieveData.penId}:`);
	console.log(recieveData);
}


if (recieveData.address === "pc" && recieveData.mode === "TactSwitch") {
	document.getElementById("penid1").classList.add("red");
}

