var channel;
var seconds = 0;
var sendData = {};
let penId;

async function standSwitch(argChannel) {
  channel = argChannel;

  var gpioAccess = await navigator.requestGPIOAccess();
  setInterval(() => {
    seconds++;
  }, 1000);
  let switchPort = gpioAccess.ports.get(5);
  await switchPort.export("in");
  switchPort.onchange = action;
}

async function action(val) {
  penId = document.getElementById("penId").q;
  sendData.id = JSON.parse(penId.value);


  if (val === 0) {
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
