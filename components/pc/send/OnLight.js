const SEATSIZE = 3;

let prevState = [...Array(SEATSIZE)].map(() => -5);
let onState = [...Array(SEATSIZE)].map(() => -5);

function onLight(channel) {
  let seatStr = "statusState";

  for (let id = 1; id <= SEATSIZE; id++) {

    const selectstate = document.getElementById(seatStr + id);

    var mo = new MutationObserver(() => {
      prevState[id - 1] = onState[id - 1];
      let sendData = {};
      sendData.address = "RPi";
      onState[id - 1] = JSON.parse(selectstate.textContent);
      
      sendData.state = onState[id - 1];
      sendData.id = id;
      if (onState[id - 1] === -1 || (prevState[id - 1] === -1 && onState[id - 1] === 0)) {
        sendData.mode = "Light";
        

        var jsonmsg = JSON.stringify(sendData);
        channel.send(jsonmsg);
      }
    });

    mo.observe(selectstate, {
      childList: true,
    });
  }
}



export default onLight;