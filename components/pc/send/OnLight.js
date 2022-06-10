// スイッチや加速度センサの情報を受け取り，pc側を変更させる．
let prevState = -5;
let onState = -5;

function onLight(channel) {
  const selectstate1 = document.getElementById("seatstate1");

  var mo = new MutationObserver(() => {
    prevState = onState;
    let sendData = {};
    sendData.address = "RPi";
    onState = JSON.parse(selectstate1.textContent);
    sendData.state = onState;
    if (onState === -1 || (prevState === -1 && onState === 0)) {
      sendData.mode = "Light";

      var jsonmsg = JSON.stringify(sendData);
      channel.send(jsonmsg);
    }
  });

  mo.observe(selectstate1, {
    childList: true,
  });
}

export default onLight;

// sendData.id = 1;
// sendData.id = document.getElementById('idbox');
