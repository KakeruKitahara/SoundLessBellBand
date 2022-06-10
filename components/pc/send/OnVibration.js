const SEATSIZE = 3;
const THRESHHOLD = 2;

function onVibrationSum(argChannel) {
  let channel = argChannel;

  let seatStr = "statusState";
  for (let id = 1; id <= SEATSIZE; id++) {
    const selectstate = document.getElementById(seatStr + id);
    var mo = new MutationObserver(() => {
      let sum = 0;
      let VibList = [];
      for (let jd = 1; jd <= SEATSIZE; jd++) {
        let jdStateNum = JSON.parse(document.getElementById(seatStr + jd).textContent);
        if (jdStateNum === 1) {
          sum++;
          VibList.push(jd);
        }
      }

      if (sum >= THRESHHOLD) {
        VibList.forEach((e) => {
          let sendData = {};
          sendData.state = true;
          sendData.id = e;
          sendData.mode = "Vibration";
          sendData.address = "RPi";
          var jsonmsg = JSON.stringify(sendData);
          channel.send(jsonmsg);
        });
      }
    });

    mo.observe(selectstate, {
      childList: true,
    });
  }
}

function onVibrationBtn(argChannel) {
  let channel = argChannel;
  let btnStr = "callBtn";
  for (let id = 1; id <= SEATSIZE; id++) {
    document.getElementById(btnStr + id).onclick = function () {
      let sendData = {};
      sendData.state = true;
      sendData.id = id;
      sendData.mode = "Vibration";
      sendData.address = "RPi";
      var jsonmsg = JSON.stringify(sendData);
      channel.send(jsonmsg);
    };
  }
}



export { onVibrationSum, onVibrationBtn };