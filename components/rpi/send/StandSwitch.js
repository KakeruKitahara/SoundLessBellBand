var channel;
var seconds = 0;
var sendData = {};
let penId;

async function standSwitch(argChannel) {
  channel = argChannel;
  penId = document.getElementById("penId");

  var gpioAccess = await navigator.requestGPIOAccess();

  setInterval(() => {
    seconds++;
  }, 1000);
  let switchPort = gpioAccess.ports.get(5);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action(val) {
    sendData.id = JSON.parse(penId.textContent);

    console.log(sendData.id);
    
    if (val === 0) {
      // Standswichに必要な状態値．
      sendData.state = true;
    } else {
      sendData.state = false;
    }
    sendData.mode = "StandSwitch";
    sendData.address = "Pc";

    var jsonmsg = JSON.stringify(sendData);

    channel.send(jsonmsg);
    seconds = 0;
}

export default standSwitch;
