function reflectName(arg) {
  let receiveData = arg;
  let mypenId = JSON.parse(document.getElementById("penId").value);
  let nameId = document.getElementById("name");

  if (mypenId === receiveData.id) {
    nameId.innerText = receiveData.content;
  }
}

export default reflectName;
