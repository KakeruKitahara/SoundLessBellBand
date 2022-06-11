async function lightVibration(receiveData) {
  let num;
  if (receiveData.mode === "Light") {
    num = 26; // ライトならば26番ポートを操作する．
  }
  if (receiveData.mode === "Vibration") {
    num = 20; // バイブレーションならば20番ポートを操作する．
  }

  const gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する．
  const port = gpioAccess.ports.get(num);
  await port.export("out"); // ポートを出力モードに設定．

  let mypenId = JSON.parse(document.getElementById("penId").value);

  if (mypenId === receiveData.id) {
    if (receiveData.mode === "Light") {
      if (receiveData.state === -1) {
        for (let i = 0; i < 3; i++) {
          await port.write(1);
          await sleep(100);
          await port.write(0);
          await sleep(100);
        }
      } else {
        await port.write(1);
        await sleep(100);
        await port.write(0);
        await sleep(100);
      }
    }
    if (receiveData.mode === "Vibration") {
      await port.write(1);
      await sleep(4000);
      await port.write(0);
    }
  }
}

export default lightVibration;
