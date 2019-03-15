const conf = require("../conf");
const serialComService = require("../serial-com");

// TODO STEP 1.1
const setModeLoraWan = () => {
    serialComService.sendCommand("at+mode=0");
    serialComService.serialEventEmitter.emit("cmd-sent", "set mode to 0");
};
// TODO STEP 1.2
const setAppEui = () => {
    const cmd = "at+set_config=app_eui:" + conf.app_eui;
    serialComService.sendCommand(cmd);
    serialComService.serialEventEmitter.emit("cmd-sent", "set app_eui");
};
// TODO STEP 1.2
const setAppKey = () => {
    const cmd = "at+set_config=app_key:" + conf.app_key;
    serialComService.sendCommand(cmd);
    serialComService.serialEventEmitter.emit("cmd-sent", "set app_key");
};
// TODO STEP 1.3
const sendJoinRequest = () => {
    serialComService.sendCommand("at+join=otaa");
    serialComService.serialEventEmitter.emit("cmd-sent", "initiate join request");
};
// TODO STEP 2
const sendGpsLocation = () => {
    const gpsLocation = {
        latitude: conf.latitude,
        longitude:conf.longitude,
        altitudeInCm: conf.altitudeAsCm
    };
    const gpsData = convertGpsLocationToPayloadData(gpsLocation);
    serialComService.sendPayload({ type: 0, port: 1, data: gpsData });
};
const convertGpsLocationToPayloadData = (gpsLocation) => {
    return "01" + "88" + gpsCoordAsHexa(gpsLocation.latitude)
        + gpsCoordAsHexa(gpsLocation.longitude) + gpsLocation.altitudeInCm.toString(16).padStart(6, "0");
};
const gpsCoordAsHexa = (coord) => {
    const rawData = Math.trunc(round_number(coord, 4) * 10000);
    let longitudeAsDec = rawData;
    if (coord < 0) {
        longitudeAsDec = (~rawData + 1 >>> 0);
    }
    return longitudeAsDec.toString(16).slice(-6).padStart(6, "0");
};
const round_number = (num, dec) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation
};
