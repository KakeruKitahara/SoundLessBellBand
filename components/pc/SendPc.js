import onLight from "./send/OnLight.js";
import {onVibrationSum, onVibrationBtn} from "./send/OnVibration.js";

function sendPc(arg) {
  let channel = arg;
  onLight(channel);
  onVibrationSum(channel);
  onVibrationBtn(channel);
}

export default sendPc;