const EventEmitter = require("events");
const SerialPort = require("serialport");
const conf = require("./conf");

const rescueService = require("./tobeimpl/rescue-service");

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: "\r\n"});
const port = new SerialPort(conf.config.tty, {baudRate: 115200});

port.pipe(parser);

parser.on("data", processReturnFromDevice);

const serialEventEmitter = new EventEmitter();

const ProcessStep = {
  IDLE: 0,
  SETTING_MODE: 1,
  SETTING_APP_KEY: 2,
  SETTING_APP_EUI: 3,
  STARTING_JOIN_REQUEST: 4,
  WAITING_JOIN_REQUEST_ACCEPTATION: 5,
  CUSTOM: 6
};

let currentStep = ProcessStep.IDLE;

const initConnect = async () => {
  console.log("init connection");
  currentStep = ProcessStep.IDLE;
  sendCommand("at+reset=0");
  await delay(500);
  currentStep = ProcessStep.SETTING_MODE;
  processNextStep();
};

const sendLocation = () => {
  rescueService.sendGpsLocation({
    latitude: conf.config.latitude,
    longitude: conf.config.longitude,
    altitudeInCm: conf.config.altitudeAsCm,
  });
};

const delay = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function processReturnFromDevice(data) {
  if (data === "Welcome to RAK811") {
    exports.serialEventEmitter.emit("reset");
    exports.serialEventEmitter.emit("server-response-raw", "resetting...");
  }
  console.log(data);
  exports.serialEventEmitter.emit("server-response-raw", data);
  if (data === "OK") {
    currentStep += 1;
    console.log(ProcessStep[currentStep]);
    processNextStep();
  } else if (isJoinRequestAcceptResponse(data)) {
    exports.serialEventEmitter.emit("server-response-raw", "Congrats! you're connected to loraServer");
    exports.serialEventEmitter.emit("allow-send-location");
  } else if (isGpsLocationReceiptConfirmation(data)) {
    exports.serialEventEmitter.emit("server-response-raw", "GPS Location has been successfully sent. Congrats! HELP IS ON ITS WAY !!");
  }
}

function processNextStep() {
  switch (currentStep) {
    case ProcessStep.SETTING_MODE:
      rescueService.setModeLoraWan();
      break;
    case ProcessStep.SETTING_APP_EUI:
      rescueService.setAppEui();
      break;
    case ProcessStep.SETTING_APP_KEY:
      rescueService.setAppKey();
      break;
    case ProcessStep.STARTING_JOIN_REQUEST:
      rescueService.sendJoinRequest();
      break;
  }
}

const sendCommand = (cmd) => {
  const cmdCompleted = cmd + "\r\n";
  port.write(cmdCompleted);
  exports.serialEventEmitter.emit("cmd-sent", cmd);
};

const sendPayload = (payload) => {
  const cmd = "at+send=" + payload.type + "," + payload.port + "," + payload.data;
  sendCommand(cmd);
};

const ComSendType = {
  TYPE_UNCONFIRMED: 0,
  TYPE_CONFIRMED: 1
};

const fireCustomCmd = (value) => {
  currentStep = ProcessStep.CUSTOM;
  if (value.startsWith("at+")) {
    sendCommand(value);
  } else {
    exports.serialEventEmitter.emit("cmd-sent", "invalid AT command...");
  }
};

const isJoinRequestAcceptResponse = (response) => {
  return response === "at+recv=3,0,0";
};

const isGpsLocationReceiptConfirmation = (response) => {
  return response === "at+recv=2,0,0";
};


module.exports = {
  serialEventEmitter,
  ComSendType,
  initConnect,
  fireCustomCmd,
  sendPayload,
  sendCommand,
  sendLocation
};
