const EventEmitter = require("events");
const SerialPort = require("serialport");
const conf = require("./tobeimpl/config");

const rescueService = require("./tobeimpl/rescue-service");

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: "\r\n" });
const port = new SerialPort(conf.config.tty, { baudRate: 115200 });

port.pipe(parser);
parser.on("data", processReturnFromDevice);

const serialEventEmitter = new EventEmitter();

let ProcessStep;

(function (ProcessStep) {
    ProcessStep[ProcessStep["IDLE"] = 0] = "IDLE";
    ProcessStep[ProcessStep["SETTING_MODE"] = 1] = "SETTING_MODE";
    ProcessStep[ProcessStep["SETTING_APP_KEY"] = 2] = "SETTING_APP_KEY";
    ProcessStep[ProcessStep["SETTING_APP_EUI"] = 3] = "SETTING_APP_EUI";
    ProcessStep[ProcessStep["STARTING_JOIN_REQUEST"] = 4] = "STARTING_JOIN_REQUEST";
    ProcessStep[ProcessStep["WAITING_JOIN_REQUEST_ACCEPTATION"] = 5] = "WAITING_JOIN_REQUEST_ACCEPTATION";
    ProcessStep[ProcessStep["CUSTOM"] = 6] = "CUSTOM";
})(ProcessStep || (ProcessStep = {}));

let currentStep = ProcessStep.IDLE;

async function initConnect() {
    console.log("init connection");
    currentStep = ProcessStep.IDLE;
    sendCommand("at+reset=0");
    await delay(500);
    currentStep = ProcessStep.SETTING_MODE;
    processNextStep();
}
exports.initConnect = initConnect;
function sendLocation() {
    rescueService.sendGpsLocation({
        latitude: conf.config.latitude,
        longitude: conf.config.longitude,
        altitudeInCm: conf.config.altitudeAsCm,
    });
}

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    }
    else if (isJoinRequestAcceptResponse(data)) {
        exports.serialEventEmitter.emit("server-response-raw", "Congrats! you're connected to loraServer");
        exports.serialEventEmitter.emit("allow-send-location");
    }
    else if (isGpsLocationReceiptConfirmation(data)) {
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

function sendCommand(cmd) {
    const cmdCompleted = cmd + "\r\n";
    port.write(cmdCompleted);
    exports.serialEventEmitter.emit("cmd-sent", cmd);
}

function sendPayload(payload) {
    const cmd = "at+send=" + payload.type + "," + payload.port + "," + payload.data;
    sendCommand(cmd);
}

var ComSendType;

(function (ComSendType) {
    ComSendType[ComSendType["TYPE_UNCONFIRMED"] = 0] = "TYPE_UNCONFIRMED";
    ComSendType[ComSendType["TYPE_CONFIRMED"] = 1] = "TYPE_CONFIRMED";
})(ComSendType = exports.ComSendType || (exports.ComSendType = {}));

function fireCustomCmd(value) {
    currentStep = ProcessStep.CUSTOM;
    if (value.startsWith("at+")) {
        sendCommand(value);
    }
    else {
        exports.serialEventEmitter.emit("cmd-sent", "invalid AT command...");
    }
}

function isJoinRequestAcceptResponse(response) {
    return response === "at+recv=3,0,0";
}
function isGpsLocationReceiptConfirmation(response) {
    return response === "at+recv=2,0,0";
}


module.exports = {
    serialEventEmitter,
    fireCustomCmd,
    sendPayload,
    sendCommand,
    sendLocation
};
