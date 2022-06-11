import lightVibration from "./receive/LightVibration.js";
import reflectName from "./receive/ReflectName.js";

async function receiveRPi(arg) {
  let channel = arg;
  channel.onmessage = RecieveMsg;
}

function RecieveMsg(msg) {
  let receiveData = JSON.parse(msg.data);
  if (receiveData.address === "RPi") {
    if (

      (receiveData.mode === "Light" || receiveData.mode === "Vibration")
    ) {
      lightVibration(receiveData);
    }

    if (receiveData.mode === "Name") {
      reflectName(receiveData);
    }
  }
}

export default receiveRPi;
