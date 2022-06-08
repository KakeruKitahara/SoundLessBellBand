var channel;
var switchPort;
let penId;

tactMain();

async function connectServer(arg) {
  var relay = RelayServer("achex", "chirimenSocket"); // 引数(無料サーバー, APIアドレス)
  channel = await relay.subscribe("chirimenSwitch");
  penId = document.getElementById("penid");
  console.log(penId.textContent);

  var gpioAccess = await navigator.requestGPIOAccess();
  let num = 6;
  if (arg === "StandSwitch") {
    num = 999; // ペン置きスイッチなら999番ポートに接続する．
  }
  if (arg === "TactSwitch") {
    num = 6; // タクトスイッチならば5番ポートを操作する．
  }
  switchPort = gpioAccess.ports.get(num);
  await switchPort.export("in");
  switchPort.onchange = action;
}

function action(val) {
  var sendData = {};
  sendData.id = penId.textContentS;
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
}

// async function standMain(){
//   connectServer();
//   setPort("StandSwitch");
//   action("StandSwitch");
// };

async function tactMain() {
  connectServer("TactSwitch");
}
