let channel;

let stop_cnt = 0; // 動き出すフラグカウント変数．
let margin_act_cnt = 0; // 止まっている時間をカウントする変数．

var groveaccelerometer;
let penId;
let prev_sumvalues = -30;
let on_sumvalues = -30;

async function accelerator(argChannel) {
  channel = argChannel;
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
  await groveaccelerometer.init();
  setInterval(action, 1000);
}

async function action() {
  penId = JSON.parse(document.getElementById("penId").q.value);
  prev_sumvalues = on_sumvalues;
  var xyz_values = await groveaccelerometer.read();
  on_sumvalues = xyz_values.x + xyz_values.y + xyz_values.z;
  let diffvalues = Math.abs(on_sumvalues - prev_sumvalues);
  if (0 <= diffvalues && diffvalues <= 1) {
    stop_cnt++;
    margin_act_cnt = Math.max(0, margin_act_cnt - 1);
  } else {
    margin_act_cnt++;
  }

  // 逆に15秒以内の動作であれば"停止"と判定して，カウントをリセットしない．
  if (margin_act_cnt > 5) {
    margin_act_cnt = 0;
    stop_cnt = 0;
  }

  var sendData = {};
  sendData.mode = "Accelerator";
  sendData.address = "Pc"; // pc用に送信．

  sendData.id = penId; // ペンごとのID．

  if (stop_cnt > 10) {
    sendData.state = 1; // 実行する状態．
  } else {
    sendData.state = 0; // 実行する状態．
  }
  var jsonmsg = JSON.stringify(sendData);
  channel.send(jsonmsg);
}

export default accelerator;
