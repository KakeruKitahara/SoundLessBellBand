var channel;
var switchPort;

let connectServer = () => {
  var relay = RelayServer("achex", "chirimenSocket"); // 引数(無料サーバー, APIアドレス)
  channel = await relay.subscribe("chirimenSwitch");

  let penId = document.getElementById("penid");
  console.log(penId);
};


let setPort = (arg) => {
  var gpioAccess = await navigator.requestGPIOAccess();
    let num;
    if (arg === "StandSwitch") {
      num = 999; // ペン置きスイッチなら999番ポートに接続する．
    }
    if (arg === "TactSwitch") {
      num = 5; // タクトスイッチならば5番ポートを操作する．
    }
  switchPort = gpioAccess.ports.get(num);
  await switchPort.export("in");
};

let action = (arg) => {

  switchPort.onchange = function (val) {
    // スイッチはPullupで離すと1なので反転させる．
    val === 0 ? 1 : 0;
  };

  var sendData;
  sendData.id = penId;
  if (val === 0) { // スイッチOFF
    sendData.state = 0;
  }
  else {
    sendData.state = 1;
  }

  sendData.address = "pc";

  sendData.mode = arg;

  var jsonmsg = JSON.stringify(sendData);
  channel.send(jsonmsg);
};

// async function standMain(){
//   connectServer();
//   setPort("StandSwitch");
//   action("StandSwitch");
// };

async function tactMain(){
  connectServer();
  setPort("TactSwitch");
  action("TactSwitch");
};
