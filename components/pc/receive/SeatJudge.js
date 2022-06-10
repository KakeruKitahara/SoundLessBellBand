var switch_cnt = 0;
let btn;

async function seatJudge(receiveData) { // ボタンを押すとこの関数内を実行する．

	let penId = receiveData.id;
	let statusState = "statusState" + penId;
	btn = "btn" + penId;

	console.log(statusState + " " + btn);

	if (receiveData.mode === "TactSwitch") {
		switch_cnt++;
		if (switch_cnt % 2 === 1) { // 1度押したら赤色に変化．
			console.log("gray!");
			colorChange("color-gray");
			document.getElementById(statusState).innerHTML = -1;
		}
		else {
			console.log("white!");
			colorChange("color-white");
			document.getElementById(statusState).innerHTML = 0;
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
			document.getElementById(statusState).innerHTML = 1;
			let btnStr = "callBtn";
			document.getElementById(btnStr + penId).classList.add("btn-lg");
		}
		else {
			console.log("white!");
			colorChange("color-white");
			document.getElementById(statusState).innerHTML = 0;
			document.getElementById(btnStr + penId).classList.remove("btn-lg");
		}
	}
	else if (receiveData.mode === "StandSwitch") {
		if (switch_cnt % 2 === 1) {
			return;
		}

		if (receiveData.state === 2) {
			console.log("green!");
			colorChange("color-green");
			document.getElementById(statusState).innerHTML = 2;
		}
		else {
			console.log("white!");
			colorChange("colo-white");
			document.getElementById(statusState).innerHTML = 0;
		}
	}
}


function colorChange(argStr) {
	let colorList = ["color-gray", "color-white", "color-red", "color-green"];
	colorList.forEach(e => {
		if (e === argStr) {
			document.getElementById(btn).classList.add(e);
		}
		else {
			document.getElementById(btn).classList.remove(e);
		}
	});
}

export default seatJudge;
