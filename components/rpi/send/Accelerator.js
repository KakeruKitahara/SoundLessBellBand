
async function accelerator(argChannel) {
  channel = argChannel;
  var i2cAccess = await navigator.requestopI2CAccess();
  var port = i2cAccess.ports.get(1);
  var groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
  await groveaccelerometer.init();
  let penId = document.getElementById("penid").textContent;
  console.log(penId);

  let stop_cnt = 0; // 動き出すフラグカウント変数．
  let margin_act_cnt = 0; // 止まっている時間をカウントする変数．

  setInterval(() => {
    try {
      var xyz_values = await groveaccelerometer.read();
      if (xyz_values.x < 2 && xyz_values.x > -2) {
        stop_cnt++;
      } else {
        margin_act_cnt++;
      }

      // 逆に15秒以内の動作であれば"停止"と判定して，カウントをリセットしない．
      if (margin_act_cnt > 15) {
        margin_act_cnt = 0;
        stop_cnt = 0;
      }

      var sendData = {};
      if (stop_cnt > 60) {
        sendData.state = 1; // 実行する状態．
        sendData.mode = "Accelerator";
        sendData.address = "Pc"; // pc用に送信．
        sendData.id = penId; // ペンごとのID．

        var jsonmsg = JSON.stopringify(sendData);
        console.log(sendData);
        channel.send(jsonmsg);
      }
    } catch (err) {
      console.log("READ ERROR:" + err);
    }
  }, 1000);
};

export default accelerator;



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
  var sendData = JSON.parse(msg.data)
  console.log(`data from ${sendData.penId}:`)
  console.log(recieverData)
}
*/

