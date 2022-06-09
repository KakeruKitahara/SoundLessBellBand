import seatJudge from "./SeatJudge";

async function receivePc(arg){
  let receiveData = arg.receiveData;
  seatJudge(receiveData);
}

export default receivePc;



