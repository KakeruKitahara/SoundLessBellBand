import seatJudge from "./receive/SeatJudge.js";

async function receivePc(arg) {
  let channel = arg;
  channel.onmessage = receiveMsg;
}

function receiveMsg(msg) {
  let receiveData = JSON.parse(msg.data);

  if (receiveData.address === "Pc") {
    seatJudge(receiveData);
  }

}


export default receivePc;



