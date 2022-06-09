// スイッチや加速度センサの情報を受け取り，pc側を変更させる．

var channel;

function demoLv(channel){
	const selectstate1 = document.getElementById("seatstate1");

	var mo = new MutationObserver(() => {

		let sendData = {};
		var seatState = JSON.parse(selectstate1.textContent);
		if (seatState === -1) {
			sendData.mode = "Light";
			sendData.address = "RPi";
			sendData.state = JSON.parse(document.getElementById("textbox").value);
			var jsonmsg = JSON.stringify(sendData);
			channel.send(jsonmsg);
		}
	});

	mo.observe(selectstate1, {
		childList: true,
	});
}

export default demoLv




// sendData.id = 1;
// sendData.id = document.getElementById('idbox');

