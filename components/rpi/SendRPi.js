import switchRpi from "./send/SwitchRPi.js";

async function sendRpi(arg) {
  let channel = arg;
  switchRpi("TactSwitch", channel);
}

export default sendRpi;
