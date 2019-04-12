const conf = require("../conf");
const serialComService = require("../serial-com");


// IMPORTANT !!!!
//replace "CHANGEME" by the command you want to send, please use "buildCommandFor***" methods instead of changing "set***" methods.
//if you don't, tests won't work as expected.


const setModeLoraWan = () => {
    serialComService.sendCommand("CHANGEME");
};
const setAppEui = () => {
    const appEUI = conf.appEUI;

    serialComService.sendCommand("CHANGEME");
};
const setAppKey = () => {
    const appKey = conf.appKey;
    serialComService.sendCommand("CHANGEME");
};

const sendJoinRequest = () => {
    // TODO STEP 2
    serialComService.sendCommand("CHANGEME");
};


const convertGpsLocationToPayloadData = (gpsLocation) => {
    // TODO STEP 3
    return "IMPLEMENT_ME";
};




const sendGpsLocation = () => {
    const gpsLocation = {
        latitude: conf.latitude,
        longitude:conf.longitude,
        altitudeInCm: conf.altitudeAsCm
    };

    //please implement convertGpsLocationToPayloadData instead of hardcode your hexa here (for test purpose)
    const gpsDataAsHexa = convertGpsLocationToPayloadData(gpsLocation);

    serialComService.sendPayload(gpsDataAsHexa);
};



module.exports = {
    setModeLoraWan,
    setAppEui,
    setAppKey,
    sendJoinRequest,
    sendGpsLocation,
    convertGpsLocationToPayloadData
};
