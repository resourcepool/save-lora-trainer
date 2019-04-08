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
    const type = -1; //CHANGEME
    const port = -1; //CHANGEME
    const gpsDataAsHexa = convertGpsLocationToPayloadData(gpsLocation);

    // hint : You need to use the 3 previous variables in your command
    // there might be a useful function in serialComService, about sending payload...

    // serialComService.sendCommand(CHANGEME);
};
const convertGpsLocationToPayloadData = (gpsLocation) => {
    return "IMPLEMENT_ME";
};
module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation,
    convertGpsLocationToPayloadData
};
