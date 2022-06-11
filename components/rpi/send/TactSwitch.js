var channel;
var seconds = 0;
var sendData = {};
let penId;

async function tactSwitch(argChannel) {
  channel = argChannel;

  var gpioAccess = await navigator.requestGPIOAccess();
  setInterval(() => {
    seconds++;
  }, 1000);
  let switchPort = gpioAccess.ports.get(6);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action() {
  if (seconds >= 2) {
    // チャタリング対策のため2秒以上の間隔が必要なので設定．
    penId = document.getElementById("penId");
    sendData.id = JSON.parse(penId.value);

    console.log(sendData.id);

    sendData.address = "Pc";
    sendData.mode = "TactSwitch";

    var jsonmsg = JSON.stringify(sendData);

    channel.send(jsonmsg);
    console.log(sendData);
    seconds = 0;
  }
}

export default tactSwitch;
