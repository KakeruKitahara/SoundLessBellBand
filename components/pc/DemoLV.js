// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;
connectServer();



async function connectServer() {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenLightVibration");
	console.log("achex web socketリレーサービスに接続しました");
}

const selectstate1 = document.getElementById("seatstate1");

var mo = new MutationObserver(() => {
	let sendData = {};
	var seatState = JSON.parse(selectstate1.textContent);
	if (seatState === -1) {
		sendData.mode = "Light";
		sendData.address = "RPi";
		sendData.state = document.getElementById("textbox");
		var jsonmsg = JSON.stringify(sendData);
		console.log(sendData.state.value);
		channel.send(jsonmsg);
	}
});

mo.observe(selectstate1, {
	childList: true,
});




// sendData.id = 1;
// sendData.id = document.getElementById('idbox');

