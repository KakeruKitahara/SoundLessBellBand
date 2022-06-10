import switchRpi from "./send/SwitchRPi.js";
import accelerator from "./send/Accelerator.js";

async function sendRpi(arg) {
  let channel = arg;
  switchRpi("TactSwitch", channel);
  switchRpi("StandSwitch", channel);
  accelerator(channel);
}

export default sendRpi;
