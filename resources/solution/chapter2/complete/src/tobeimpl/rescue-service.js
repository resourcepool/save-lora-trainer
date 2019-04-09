const conf = require("../conf");
let serialComService = require("../serial-com");


const buildCommandForSetModeLoraWan = () => {
    // TODO STEP 1.1
    console.debug("Setting LoRaWAN mode");
    return "at+mode=0";
};

const buildCommandForSetAppEui = () => {
    // TODO STEP 1.2
    const appEUI = conf.appEUI;
    console.debug("Setting App EUI");
    return "at+set_config=app_eui:" + appEUI;
};

const buildCommandForSetAppKey = () => {
    // TODO STEP 1.2
    const appKey = conf.appKey;
    console.debug("Setting App Key");
    return "at+set_config=app_key:" + appKey;
};


const sendJoinRequest = () => {
    console.debug("Setting Join Request");
    serialComService.sendCommand("at+join=otaa");
};
const sendGpsLocation = () => {
    console.debug("Setting GPS Location");
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
const decimalToHexString = (number) => {
    if (number < 0){
        number = 0xFFFFFF + number + 1;
    }
    return number.toString(16);
};
const gpsCoordAsHexa = (coord) => {
    const rawData = Math.trunc(round_number(coord, 4) * 10000) ;
    return decimalToHexString(rawData).slice(-6).padStart(6, "0");
};
const round_number = (num, dec) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
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
