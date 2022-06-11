function reflectName(arg) {
  let receiveData = arg;
  let mypenId = JSON.parse(document.getElementById("penId"));
  let nameId = document.getElementById("penId")

  if (mypenId === receiveData.id) {
  nameId.innerText = receiveData.content;
  }
}

export default reflectName;