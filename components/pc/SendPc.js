import onLight from "./send/OnLight.js";

function sendPc(arg) {
  let channel = arg;
  onLight(channel);
}

export default sendPc;