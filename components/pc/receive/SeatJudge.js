var switch_cnt = 0;

async function seatJudge(receiveData) { // ボタンを押すとこの関数内を実行する．



	if (receiveData.mode === "TactSwitch") {
		switch_cnt++;
		if (switch_cnt % 2 === 1) { // 1度押したら赤色に変化．
			console.log("gray!");
			colorChange("color-gray");
			document.getElementById("seatstate1").innerHTML = -1;
		}
		else {
			console.log("white!");
			colorChange("color-white");
			document.getElementById("seatstate1").innerHTML = 0;
			// 0 : 通常
			// -1 : 秘匿
			// 1 : 質問
			// 2 : 完了
		}
	}
	else if (receiveData.mode === "Accelerator") {
		if (switch_cnt % 2 === 1) {
			return;
		}

		if (receiveData.state === 1) { // 1度押したら赤色に変化．
			console.log("red!");
			colorChange("color-red");
			document.getElementById("seatstate1").innerHTML = 1;
		}
		else {
			console.log("white!");
			colorChange("color-white");
			document.getElementById("seatstate1").innerHTML = 0;
		}
	}
	else if (receiveData.mode === "StandSwitch") {
		if (switch_cnt % 2 === 1) {
			return;
		}

		if (receiveData.state === 2) {
			console.log("green!");
			colorChange("color-green");
			document.getElementById("seatstate1").innerHTML = 2;
		}
		else {
			console.log("white!");
			colorChange("colo-white");
			document.getElementById("seatstate1").innerHTML = 0;
		}
	}
}


function colorChange(argStr) {
	let colorList = ["color-gray", "color-white", "color-red", "color-green"];
	colorList.forEach(e => {
		if (e === argStr) {
			document.getElementById("penid1").classList.add(e);
		}
		else {
			document.getElementById("penid1").classList.remove(e);
		}
	});
}

export default seatJudge;
