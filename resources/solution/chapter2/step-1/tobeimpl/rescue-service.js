const conf = require("../conf");
const serialComService = require("../serial-com");

const setModeLoraWan = () => {
    serialComService.sendCommand("at+mode=0");
};
const setAppEui = () => {
    const cmd = "at+set_config=app_eui:" + conf.appEUI;
    serialComService.sendCommand(cmd);
};
const setAppKey = () => {
    const cmd = "at+set_config=app_key:" + conf.appKey;
    serialComService.sendCommand(cmd);
};
const sendJoinRequest = () => {
    // TODO STEP 2
    // serialComService.sendCommand(CHANGEME);
};
const sendGpsLocation = () => {
    // TODO STEP 3
    const gpsLocation = {
        latitude: conf.latitude,
        longitude:conf.longitude,
        altitudeInCm: conf.altitudeAsCm
    };
    // serialComService.sendCommand(CHANGEME); Or you can use the const serialComService.sendPayload
};

module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation
};
