var channel;
var port;

main_ses();

async function main_vib() {
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenLED");
	document.getElementById("message").innerText="connected : achex : chirimenSocket : chirimenLED";
	channel.onmessage = controlLED;
	
	var gpioAccess = await navigator.requestGPIOAccess(); // GPIO を操作する
	port = gpioAccess.ports.get(26); // 26 番ポートを操作する
	await port.export("out"); // ポートを出力モードに設定
}


function controlLED(msg){
	document.getElementById("message").innerText=msg.data;
	if ( msg.data =="LED ON"){
		port.write(1);
		console.log("ON");
		channel.send("LEDをオンにしました");
	} else if ( msg.data =="LED OFF"){
		port.write(0);
		console.log("OFF");
		channel.send("LEDをオフにしました");
	}
}

async function readData(){
	var shtData = await sht.readData();
	console.log('shtData:', shtData);
	msgDiv.innerHTML= "temperature:" + shtData.temperature + "degree  <br>humidity:"+ shtData.humidity + "%";
	return(shtData);
}

