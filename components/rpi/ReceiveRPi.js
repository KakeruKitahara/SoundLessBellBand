import lightVibration from "./receive/LightVibration.js";

async function receiveRPi(arg) {
  let channel = arg;
  channel.onmessage = RecieveMsg;
}

function RecieveMsg(msg) {
  recieveData = JSON.parse(msg.data);

  if (receiveData.address === "RPi" && receiveData.mode === "Light" || receiveData.mode === "Vibration") {
    lightVibration(receiveData);
  }
}

export default receiveRPi;
