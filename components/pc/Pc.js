import connectServer from "./ConnectServer.js";
import{drawingCharts, updateChart} from "./DrawingCharts.js";
import receivePc from "./ReceivePc.js";
import sendPc from "./SendPc.js";

pc();

async function pc() {
  drawingCharts();
  let channel = await connectServer();
  receivePc(channel);
  sendPc(channel);
};

