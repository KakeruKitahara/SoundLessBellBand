// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;
var recieveData;

onload = async function () {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimen");
	channel.onmessage = RecieveAction; // データを受け取る．
}


var prevflag = -1, onflag = -1;
var cnt = 0;

function RecieveAction(msg) { // ボタンを押すとこの関数内を実行する．
	let recieveData = JSON.parse(msg.data);
	// console.log(recieveData);
	if (recieveData.address === "pc" && recieveData.mode === "TactSwitch") {
		prevflag = onflag;
		if (recieveData.state === true) {
			onflag = 1;
		}
		if (recieveData.state === false) {
			onflag = 0;
		}

		if (onflag === 0 && prevflag === 1) {
			cnt++;

			if (cnt % 2 === 1) { // 1度押したら赤色に変化．
				console.log("red!");

				document.getElementById("penid1").classList.remove("white");
				document.getElementById("penid1").classList.add("red");

				document.getElementById("seatstate1").innerHTML = -1;
			}
			else {
				console.log("white!");

				document.getElementById("penid1").classList.remove("red");
				document.getElementById("penid1").classList.add("white");

				document.getElementById("seatstate1").innerHTML = 0;
				// 0 : 通常
				// -1 : 秘匿
				// 1 : 質問
				// 2 : 完了
			}

		}
	}
}
