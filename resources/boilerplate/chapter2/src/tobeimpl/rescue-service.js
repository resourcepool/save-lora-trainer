const conf = require("../conf");
const serialComService = require("../serial-com");


// IMPORTANT !!!!
//replace "CHANGEME" by the command you want to send, please use "buildCommandFor***" methods instead of changing "set***" methods.
//if you don't, tests won't work as expected.


const buildCommandForSetModeLoraWan = () => {
    // TODO STEP 1.1
    return "CHANGEME";
};

const buildCommandForSetAppEui = () => {
    // TODO STEP 1.2
    const appEUI = conf.appEUI;
    return "CHANGEME";
};

const buildCommandForSetAppKey = () => {
    // TODO STEP 1.2
    const appKey = conf.appKey;
    return "CHANGEME";
};


const sendJoinRequest = () => {
    // TODO STEP 2
    serialComService.sendCommand("CHANGEME");
};
const sendGpsLocation = () => {
    // TODO STEP 3
    const gpsLocation = {
        latitude: conf.latitude,
        longitude:conf.longitude,
        altitudeInCm: conf.altitudeAsCm
    };
    // You need to set correct values for those 3 variables
    const port = -1; //CHANGEME
    const type = -1; //CHANGEME
    //please implement convertGpsLocationToPayloadData (just below this function) instead of hardcode your hexa
    const gpsDataAsHexa = convertGpsLocationToPayloadData(gpsLocation);


    serialComService.sendPayload({ type: type, port: port, data: gpsDataAsHexa });
};
const convertGpsLocationToPayloadData = (gpsLocation) => {
    // TODO STEP 3
    return "IMPLEMENT_ME";
};


const setModeLoraWan = () => {
    serialComService.sendCommand(buildCommandForSetModeLoraWan());
};
const setAppEui = () => {
    serialComService.sendCommand(buildCommandForSetAppEui());
};
const setAppKey = () => {
    serialComService.sendCommand(buildCommandForSetAppKey());
};
module.exports = {
    setModeLoraWan,
    buildCommandForSetModeLoraWan,
    setAppEui,
    buildCommandForSetAppEui,
    setAppKey,
    buildCommandForSetAppKey,
    sendJoinRequest,
    sendGpsLocation,
    convertGpsLocationToPayloadData
};
