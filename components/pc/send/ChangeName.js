const SEATSIZE = 3;

function changeName(channel) {
  let classIdStr = ["submitChangeName", "InputName", "player-name"];

  for (let id = 1; id <= SEATSIZE; id++) {
    document.getElementById(classIdStr[0] + id).onclick = () => {
      let nameContent = document.getElementById(classIdStr[1] + id);
      let playerName = document.getElementsByClassName(classIdStr[2] + id);

      for (let j = 0; j < playerName.length; j++) {
        playerName[j].innerText = nameContent.value;
      }
      let sendData = {};
      sendData.content = nameContent.value;
      sendData.id = id;
      sendData.mode = "Name";
      sendData.address = "RPi";
      var jsonmsg = JSON.stringify(sendData);
      channel.send(jsonmsg);
    };
  }
}

export default changeName;