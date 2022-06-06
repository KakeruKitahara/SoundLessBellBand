var channel;
var recieveData;

let connectServer = () => {
  var relay = RelayServer("achex", "chirimenSocket"); // 引数(無料サーバー, APIアドレス)
  channel = await relay.subscribe("chirimenLightVibration");

  recieveData = JSON.parse(msg.data);
  console.log(`data from ${recieveData.penId}:`);
  console.log(recieveData);

  let penId = document.getElementById("penid");
  console.log(penId);
};

let action = () => {
  // 無限ループ
  while (true) {
    if (recieveData.state === 1) {
      await port.write(1); // 点灯．
    }
    else {
      await port.write(0); // 消灯．
    }
  }
};

async function main() {
  connectServer();
  if (recieveData.address === "RPi") {
    if (recieveData.mode === "Light" || recieveData.mode === "Vibration") {
      let num;
      if (recieveData.mode === "Light") {
        num = 26; // ライトならば26番ポートを操作する．
      }
      if (recieveData.mode === "Vibration") {
        num = 20; // バイブレーションならば26番ポートを操作する．
      }
      console.log(`Connect : ${num}port.`);

      const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する．
      const port = gpioAccess.ports.get(num);
      await port.export("out"); // ポートを出力モードに設定．

      action();
    }
  }
}
