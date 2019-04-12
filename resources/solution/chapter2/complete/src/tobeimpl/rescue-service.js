const conf = require("../conf");
let serialComService = require("../serial-com");



const setModeLoraWan = () => {
    serialComService.sendCommand("at+mode=0");
};

const setAppEui = () => {
    const appEUI = conf.appEUI;
    serialComService.sendCommand("at+set_config=app_eui:" + appEUI);
};

const setAppKey = () => {
    const appKey = conf.appKey;
    serialComService.sendCommand("at+set_config=app_key:" + appKey);
};


const sendJoinRequest = () => {
    console.debug("Setting Join Request");
    serialComService.sendCommand("at+join=otaa");
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


module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation,
    convertGpsLocationToPayloadData
};
