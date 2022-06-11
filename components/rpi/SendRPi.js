import accelerator from "./send/Accelerator.js";
import standSwitch from "./send/StandSwitch.js";
import tactSwitch from "./send/TactSwitch.js";

async function sendRpi(arg) {
  let channel = arg;
  standSwitch(channel);
  tactSwitch(channel);
  accelerator(channel);
}

export default sendRpi;
