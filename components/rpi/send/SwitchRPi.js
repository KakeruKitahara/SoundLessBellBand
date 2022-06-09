var channel;
var switchPort;
let penId;
var cnt = 0;

async function switchRpi(argStr, argChannnel) {
  channel = argChannnel;
  penId = document.getElementById("penid");
  console.log(penId.textContent);

  var gpioAccess = await navigator.requestGPIOAccess();
  let num = 6;
  if (argStr === "StandSwitch") {
    num = 999; // ペン置きスイッチなら999番ポートに接続する．
  }
  if (argStr === "TactSwitch") {
    num = 6; // タクトスイッチならば5番ポートを操作する．
  }
  setInterval(() => {
    cnt++;
    console.log(cnt);
  }, 1000);
  switchPort = gpioAccess.ports.get(num);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action(val) {
  if (cnt >= 2) {
    // チャタリング対策のため2秒以上の間隔が必要
    var sendData = {};
    sendData.id = penId.textContent;
    if (val === 0) {
      // スイッチON
      sendData.state = true;
    } else {
      sendData.state = false;
    }

    sendData.address = "pc";

    sendData.mode = "TactSwitch";

    var jsonmsg = JSON.stringify(sendData);

    channel.send(jsonmsg);
    cnt = 0;
  }
}

export default switchRpi;

// async function standMain(){
//   connectServer();
//   setPort("StandSwitch");
//   action("StandSwitch");
// };
