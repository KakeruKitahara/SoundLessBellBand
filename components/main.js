main();
//Timer();

async function main() {
  var ax = document.getElementById("ax");
  var ay = document.getElementById("ay");
  var az = document.getElementById("az");
  var result = document.getElementById("result");
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var groveaccelerometer = new GROVEACCELEROMETER(port, 0x53);
  await groveaccelerometer.init();

  let st_cnt = 0; // 動き出すフラグカウント変数．
  let jd_cnt = 0; // 止まっている時間をカウントする変数．
  while( 1 ) {
    try {
      var values = await groveaccelerometer.read();
      ax.innerHTML = values.x ? values.x : ax.innerHTML;
      ay.innerHTML = values.y ? values.y : ay.innerHTML;
      az.innerHTML = values.z ? values.z : az.innerHTML;
      if (values.x < 2 && values.x > -2) {
        st_cnt++;
      }else{
        jd_cnt++;
      }

      // 逆に15秒以内の動作であれば"停止"と判定して，カウントをリセットしない．
      if(jd_cnt > 150){
        jd_cnt = 0;
        st_cnt = 0;
      }

      if(cnt > 3000){
        result.innerHTML = "stopping";
      }
      else{
        result.innerHTML = "moving";
      }
    } catch (err) {
      console.log("READ ERROR:" + err);
    }
    await sleep(100); // 0.1ごとに検知．
  }
}

/*
async function Timer(var PassSec){

  Reset();

  function CountUp(){
    PassSec++:
  }
  function Reset(){
    PassSec=0;
    PassageID = setInterval("CountUp()",1000);
  }
}
*/
