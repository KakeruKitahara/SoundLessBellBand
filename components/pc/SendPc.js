import changeName from "./send/ChangeName.js";
import onLight from "./send/OnLight.js";
import {onVibrationSum, onVibrationBtn} from "./send/OnVibration.js";

function sendPc(arg) {
  let channel = arg;
  changeName(channel);
  onLight(channel);
  onVibrationSum(channel);
  onVibrationBtn(channel);
}

export default sendPc;