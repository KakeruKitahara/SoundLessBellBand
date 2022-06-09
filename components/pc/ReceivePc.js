import seatJudge from "./SeatJudge.js";

async function receivePc(arg){
  let receiveData = arg.receiveData;
  seatJudge(receiveData);
}

export default receivePc;



