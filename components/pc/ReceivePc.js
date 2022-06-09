import seatJudge from "./receive/SeatJudge.js";

async function receivePc(arg) {
  let channel = arg;
  channel.onmessage = receiveMsg;
}

function receiveMsg(msg) {
  let receiveData = JSON.parse(msg.data);

  if (receiveData.address === "pc" && receiveData.mode === "TactSwitch") {
    seatJudge();
    
  }
  if (receiveData.address === "pc" && receiveData.mode === "StandSwitch") {

  }
  if (receiveData.address === "pc" && receiveData.mode === "Accelerator") {

  }
}


export default receivePc;



