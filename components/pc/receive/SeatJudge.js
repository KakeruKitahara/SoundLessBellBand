var switch_cnt = 0;
let btn;
let statusState;
let seatState;
let compFlag = false;

async function seatJudge(receiveData) { // ボタンを押すとこの関数内を実行する．

	if (compFlag === true) {
		return;
	}

	let penId = receiveData.id;
	statusState = "statusState" + penId;
	btn = "btn" + penId;
	seatState = "seatState" + penId;

	console.log(statusState + " " + btn);

	if (receiveData.mode === "TactSwitch") {
		switch_cnt++;
		if (switch_cnt % 2 === 1) { // 1度押したら赤色に変化．
			console.log("gray!");
			seatChange("color-gray");
		}
		else {
			console.log("white!");
			seatChange("color-white");
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
		let btnStr = "callBtn";

		if (receiveData.state === 1) { // 1度押したら赤色に変化．
			console.log("red!");
			seatChange("color-red");
			document.getElementById(btnStr + penId).classList.add("disabled");
		}
		else {
			console.log("white!");
			seatChange("color-white");
			document.getElementById(btnStr + penId).classList.remove("disabled");
		}
	}
	else if (receiveData.mode === "StandSwitch") {
		console.log("a");
		if (switch_cnt % 2 === 1) {
			return;
		}
		console.log("green!");
		seatChange("color-green");
		compFlag = true;
		/*
				if (receiveData.state === true) {
					console.log("green!");
					seatChange("color-green");
					compFlag = true;
				}
				else if(receiveData.state === false) {
					console.log("white!");
					seatChange("colo-white");
				}
				else{
					console.log(`ERROR : ${receiveData.state}`);
				}
				*/

	}
}


function seatChange(argStr) {
	let colorList = [{ key: "color-gray", state: -1, text: "秘匿中..." }, { key: "color-white", state: 0, text: "取り組み中" }, { key: "color-red", state: 1, text: "長考中..." }, { key: "color-green", state: 2, text: "完了!" }];
	colorList.forEach(e => {
		if (e.key === argStr) {
			document.getElementById(btn).classList.add(e.key);
			document.getElementById(statusState).innerText = e.state;
			document.getElementById(seatState).innerText = e.text;
			// ここにseatStateの色変更のプロパティもつける．
		}
		else {
			document.getElementById(btn).classList.remove(e.key);
		}
	});
}


export default seatJudge;
