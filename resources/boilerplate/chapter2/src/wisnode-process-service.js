const rescueService = require("./tobeimpl/rescue-service");
const serialComService = require("./serial-com");

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
    serialComService.sendCommand("at+reset=0");
    await delay(500);
    currentStep = ProcessStep.SETTING_MODE;
    processNextStep();
};

const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

serialComService.serialEventEmitter.on("data-from-device", (data) => {
    if (data === "OK") {
        currentStep += 1;
        console.log(ProcessStep[currentStep]);
        processNextStep();
    } else if (isJoinRequestAcceptResponse(data)) {
        serialComService.serialEventEmitter.emit("server-response-raw", "Congrats! you're connected to loraServer");
        serialComService.serialEventEmitter.emit("allow-send-location");
    } else if (isGpsLocationReceiptConfirmation(data)) {
        serialComService.serialEventEmitter.emit("server-response-raw", "GPS Location has been successfully sent. Congrats! HELP IS ON ITS WAY !!");
    }
});


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

const debug = () => {
    serialComService.debug();
};

const isJoinRequestAcceptResponse = (response) => {
    return response === "at+recv=3,0,0";
};

const isGpsLocationReceiptConfirmation = (response) => {
    return response === "at+recv=2,0,0";
};

const fireCustomCmd = (value) => {
    currentStep = ProcessStep.CUSTOM;
    if (value.startsWith("at+")) {
        serialComService.sendCommand(value);
    } else {
        serialComService.serialEventEmitter.emit("cmd-sent", "invalid AT command...");
    }
};
module.exports = {
    initConnect,
    fireCustomCmd,
    debug
};
