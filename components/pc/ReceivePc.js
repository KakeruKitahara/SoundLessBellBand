import seatJudge from "./recieve/SeatJudge.js";

async function receivePc(arg) {
  let channel = arg;
  channel.onmessage = RecieveMsg;
}

function RecieveMsg(msg) {
  recieveData = JSON.parse(msg.data);

  if (receiveData.address === "pc" && receiveData.mode === "TactSwitch") {
    seatJudge(receiveData);
  }
  if (receiveData.address === "pc" && receiveData.mode === "StandSwitch") {
    seatJudge(receiveData);
  }
  if (receiveData.address === "pc" && receiveData.mode === "Accelerator") {
    seatJudge(receiveData);
  }
}


export default receivePc;



