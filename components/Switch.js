constructor();
main();

async function constructor() {
  var relay = RelayServer("achex", "chirimenSocket"); // 引数(無料サーバー, APIアドレス)
  channel = await relay.subscribe("chirimenSwitch");
  channel.onmessage = getMessage;

  function getMessage(message) {
    console.log(message.data);
  }

  var gpioAccess = await navigator.requestGPIOAccess();
  var ledPort = gpioAccess.ports.get(26); // LEDの付いているポート
  await ledPort.export("out");
  var switchPort = gpioAccess.ports.get(5); // タクトスイッチの付いているポート
  await switchPort.export("in");


  let penId = document.getElementById("penid");
  console.log(penId);
}

async function main() {

  switchPort.onchange = function (val) {
    // スイッチはPullupで離すと1なので反転させる
    ledPort.write(val === 0 ? 1 : 0);
  };

  var sendData = {}
  sendData.id = penId;
  if (val === 0) { // スイッチOFF
    sendData.state = 0;
  }
  else {
    sendData.state = 1;
  }
  var jsonmsg = JSON.stopringify(sendData);
  channel.send(jsonmsg);
}