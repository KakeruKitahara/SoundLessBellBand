async function lightVibration(receiveData) {
  if (receiveData.mode === "Light" || receiveData.mode === "Vibration") {
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

    let penId = document.getElementById("penid");
    console.log(penId.textContent);

    if (receiveData.state === -2) {
      console.log("light : 1");
      for (let i = 0; i < 3; i++) {
        await port.write(1);
        await sleep(100);
        await port.write(0);
        await sleep(100);
      }
    } else {
      console.log("light : 0");
      await port.write(1);
      await sleep(100);
      await port.write(0);
      await sleep(100);
    }
  }
}

export default lightVibration;
