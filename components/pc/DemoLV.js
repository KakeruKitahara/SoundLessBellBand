// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;
var sendData={};

onload = async function () {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenLightVibration");
	console.log("achex web socketリレーサービスに接続しました");
}

// sendData.id = 1;
// sendData.id = document.getElementById('idbox');
sendData.mode = "Light";
sendData.address = "RPi";
sendData.state = document.getElementById('textbox');
var jsonmsg = JSON.stringify(sendData);
channel.send(jsonmsg);
