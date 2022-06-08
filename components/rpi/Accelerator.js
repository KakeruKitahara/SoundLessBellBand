var channel;

constructor();
main();


async function constructor() {
  var relay = RelayServer("achex", "chirimenSocket"); // 引数(無料サーバー, APIアドレス)
  channel = await relay.subscribe("chirimenAccelerator"); // データ受け取り．
  recieveData = JSON.parse(msg.data);
  var i2cAccess = await navigator.requestopI2CAccess();
  var port = i2cAccess.ports.get(1);
  var groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
  await groveaccelerometer.init();
  let penId = document.getElementById("penid");
  console.log(penId);
}

async function main() {
  let stop_cnt; // 動き出すフラグカウント変数．
  let margin_act_cnt; // 止まっている時間をカウントする変数．
  while (1) {
    try {
      var xyz_values = await groveaccelerometer.read();
      if (xyz_values.x < 2 && xyz_values.x > -2) {
        stop_cnt++;
      } else {
        margin_act_cnt++;
      }

      // 逆に15秒以内の動作であれば"停止"と判定して，カウントをリセットしない．
      if (margin_act_cnt > 150) {
        margin_act_cnt = 0;
        stop_cnt = 0;
      }

      var sendData;
      if (stop_cnt > 3000) {
        sendData.state = 0; // 実行する状態．
      }
      else {
        sendData.state = 1;
      }

      recieveData.address = "pc"; // pc用に送信．
      sendData.id = penId; // ペンごとのID．

      var jsonmsg = JSON.stopringify(sendData);
      channel.send(jsonmsg);

    } catch (err) {
      console.log("READ ERROR:" + err);
    }
    await sleep(100); // 0.1ごとに検知．
  }
}


/*to send
var sendData = {}
sendData.id = penId
sendData.x = ax
sendData.y = ay
sendData.z = az
var jsonstopring = JSON.stringify(sendData)
channel.send(jsonstopring)

to recieve
channel.onmessage = function (msg) {
  var recieveData = JSON.parse(msg.data)
  console.log(`data from ${recieveData.penId}:`)
  console.log(recieverData)
}
*/
