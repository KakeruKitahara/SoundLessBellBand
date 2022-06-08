// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;

onload = async function () {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenLightVibration");
	console.log("achex web socketリレーサービスに接続しました");
}

async function recieveSheat() {
	while (1) {
		let sendData = {};
		let sheatStateStr = document.getElementById("log1");
		var seatState = JSON.parse(sheatStateStr.toLowerCase());
		console.log(seatState);
		if (seatState === -1) {
			sendData.mode = "Light";
			sendData.address = "RPi";
			sendData.state = document.getElementById('textbox');
			var jsonmsg = JSON.stringify(sendData);
			channel.send(jsonmsg);
		}
	}
}

// sendData.id = 1;
// sendData.id = document.getElementById('idbox');

