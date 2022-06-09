import switchRpi from "./send/SwitchRpi.js";

async function sendRpi(arg){
  let channel = arg;
  switchRpi("TactSwitch", channel);
}

export default sendRpi;



