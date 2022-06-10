var channel;
var seconds = 0;
var sendData = {};
let penId;

async function switchRpi(argStr, argChannel) {
  channel = argChannel;
  penId = JSON.parse(document.getElementById("penId").value);

  var gpioAccess = await navigator.requestGPIOAccess();
  let num;
  if (argStr === "StandSwitch") {
    num = 5; // ペン置きスイッチなら999番ポートに接続する．
    sendData.mode = "StandSwitch";
  }
  if (argStr === "TactSwitch") {
    num = 6; // タクトスイッチならば5番ポートを操作する．
    sendData.mode = "TactSwitch";
  }
  setInterval(() => {
    seconds++;
  }, 1000);
  let switchPort = gpioAccess.ports.get(num);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action(val) {
  if (seconds >= 2) {
    // チャタリング対策のため2秒以上の間隔が必要なので設定．

    sendData.id = penId;

    console.log(sendData.id);

    if (val === 0) {
      // Standswichに必要な状態値．
      sendData.state = true;
    } else {
      sendData.state = false;
    }

    sendData.address = "Pc";

    var jsonmsg = JSON.stringify(sendData);

    channel.send(jsonmsg);
    seconds = 0;
  }
}

export default switchRpi;
