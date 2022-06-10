var channel;
var cnt = 0;
var sendData = {};

async function switchRpi(argStr, argChannel) {
  channel = argChannel;
  let penId = document.getElementById("penid");
  console.log(penId.textContent);



  var gpioAccess = await navigator.requestGPIOAccess();
  let num = 6;
  if (argStr === "StandSwitch") {
    num = 999; // ペン置きスイッチなら999番ポートに接続する．
    sendData.mode = "StandSwitch";
  }
  if (argStr === "TactSwitch") {
    num = 6; // タクトスイッチならば5番ポートを操作する．
    sendData.mode = "TactSwitch";
  }
  setInterval(() => {
    cnt++;
    console.log(cnt);
  }, 1000);
  let switchPort = gpioAccess.ports.get(num);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action(val) {
  if (cnt >= 2) {
    // チャタリング対策のため2秒以上の間隔が必要なので設定．
    sendData.id = penId.textContent;
    if (val === 0) {
      // Standswichに必要な状態値．
      sendData.state = true;
    } else {
      sendData.state = false;
    }

    sendData.address = "Pc";

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
