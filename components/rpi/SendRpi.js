import switchRpi from "./SwitchRpi.js";

async function sendRpi(arg){
  let channel = arg.channel;
  switchRpi("TactSwitch", channel);
}

export default sendRpi;



