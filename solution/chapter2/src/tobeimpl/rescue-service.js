const config_1 = require("../conf");
const wisnodeProcessService = require("../wisnode-process-service");
// TODO STEP 1.1
function setModeLoraWan() {
    wisnodeProcessService.sendCommand("at+mode=0");
    wisnodeProcessService.serialEventEmitter.emit("cmd-sent", "set mode to 0");
}
// TODO STEP 1.2
function setAppEui() {
    const cmd = "at+set_config=app_eui:" + config_1.config.app_eui;
    wisnodeProcessService.sendCommand(cmd);
    wisnodeProcessService.serialEventEmitter.emit("cmd-sent", "set app_eui");
}
// TODO STEP 1.2
function setAppKey() {
    const cmd = "at+set_config=app_key:" + config_1.config.app_key;
    wisnodeProcessService.sendCommand(cmd);
    wisnodeProcessService.serialEventEmitter.emit("cmd-sent", "set app_key");
}
// TODO STEP 1.3
function sendJoinRequest() {
    wisnodeProcessService.sendCommand("at+join=otaa");
    wisnodeProcessService.serialEventEmitter.emit("cmd-sent", "initiate join request");
}
// TODO STEP 1.3
function isJoinRequestAcceptResponse(response) {
    return response === "at+recv=3,0,0";
}
// TODO STEP 2
function sendGpsLocation(gpsLocation) {
    const gpsData = convertGpsLocationToPayloadData(gpsLocation);
    wisnodeProcessService.sendPayload({ type: 0, port: 1, data: gpsData });
}
// TODO STEP 2
function isGpsLocationReceiptConfirmation(response) {
    return response === "at+recv=2,0,0";
}
function convertGpsLocationToPayloadData(gpsLocation) {
    return "01" + "88" + gpsCoordAsHexa(gpsLocation.latitude)
        + gpsCoordAsHexa(gpsLocation.longitude) + gpsLocation.altitudeInCm.toString(16).padStart(6, "0");
}
function gpsCoordAsHexa(coord) {
    const rawData = Math.trunc(round_number(coord, 4) * 10000);
    let longitudeAsDec = rawData;
    if (coord < 0) {
        longitudeAsDec = (~rawData + 1 >>> 0);
    }
    return longitudeAsDec.toString(16).slice(-6).padStart(6, "0");
}
function round_number(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation
};
