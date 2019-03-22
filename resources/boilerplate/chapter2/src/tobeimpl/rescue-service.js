const conf = require("../conf");
const serialComService = require("../serial-com");

const setModeLoraWan = () => {
    // TODO STEP 1.1
    // serialComService.sendCommand(CHANGEME);
};
const setAppEui = () => {
    // TODO STEP 1.2
    const appEUI = conf.appEUI;
    // serialComService.sendCommand(CHANGEME);
};
const setAppKey = () => {
    // TODO STEP 1.2
    const appKey = conf.appKey;
    // serialComService.sendCommand(CHANGEME);
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
