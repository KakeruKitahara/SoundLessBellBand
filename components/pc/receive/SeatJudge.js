var cnt = 0;

async function seatJudge() { // ボタンを押すとこの関数内を実行する．

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

export default seatJudge;
