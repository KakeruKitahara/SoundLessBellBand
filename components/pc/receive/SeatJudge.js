var switch_cnt = 0;

async function seatJudge(receiveData) { // ボタンを押すとこの関数内を実行する．

	if (receiveData.mode === "TactSwitch") {
		switch_cnt++;
		if (switch_cnt % 2 === 1) { // 1度押したら赤色に変化．
			console.log("gray!");

			document.getElementById("penid1").classList.remove("white");
			document.getElementById("penid1").classList.add("gray");

			document.getElementById("seatstate1").innerHTML = -1;
		}
		else {
			console.log("white!");

			document.getElementById("penid1").classList.remove("gray");
			document.getElementById("penid1").classList.add("white");

			document.getElementById("seatstate1").innerHTML = 0;
			// 0 : 通常
			// -1 : 秘匿
			// 1 : 質問
			// 2 : 完了
		}
	}
	else if (receiveData.mode === "StandSwitch") {
		if (switch_cnt % 2 === 0) {
			return;
		}

		if (receiveData.state === 1) { // 1度押したら赤色に変化．
			console.log("red");

			document.getElementById("penid1").classList.remove("white");
			document.getElementById("penid1").classList.add("red");

			document.getElementById("seatstate1").innerHTML = 1;
		}
		else {
			console.log("white!");

			document.getElementById("penid1").classList.remove("red");
			document.getElementById("penid1").classList.add("white");

			document.getElementById("seatstate1").innerHTML = 0;
		}
	}
	if (receiveData.mode === "Accelerator") {
		if (switch_cnt % 2 === 0) {
			return;
		}

		if (receiveData.state === 2) {
			console.log("greem");

			document.getElementById("penid1").classList.remove("white");
			document.getElementById("penid1").classList.add("red");

			document.getElementById("seatstate1").innerHTML = 2;
		}
		else {
			console.log("white!");

			document.getElementById("penid1").classList.remove("red");
			document.getElementById("penid1").classList.add("white");

			document.getElementById("seatstate1").innerHTML = 0;
		}
	}
}

export default seatJudge;
