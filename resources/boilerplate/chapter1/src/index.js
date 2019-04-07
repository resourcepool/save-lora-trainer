const api = require('./api/api');
const utils = require('./utils');
const mqtt = require('mqtt');
const conf = require('./conf');
const reviewService = require('./noedit/progress/review-service');

const Logger = require('./noedit/log/logger');

const JoinRequestPacketDecoder = require('./decoder/JoinRequestPacketDecoder');

const gatewayRxTopicRegex = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");

const validAppEUI = utils.hexStringToBytes(conf.user.appEUI);
const validMockAppEUI = utils.hexStringToBytes(conf.user.mockAppEUI);
const deviceEUI = utils.hexStringToBytes(conf.user.deviceEUI);
const deviceNetworkKey = utils.normalizeHexString(conf.user.nwkKey);

const logger = Logger.child({service: 'index'});
let client;
let init = () => {
    console.log('warn', 'You can log a lot more by changing the log level. set it to "verbose" in conf.js line 40.');
    reviewService.init();
    // TODO Step 1: Connect to the city's remote MQTT Broker
    // Using the provided MQTT client, connect to the remote MQTT broker (cf README.md)
    // Those idiots gave away their credentials so easily... Noobs!
    // MQTT Client documentation => https://github.com/mqttjs/MQTT.js
    // You want to listen to all incoming messages... Did I hear the word "Wildcard"?

    // Don't forget to manually set your clientId, otherwise your step wont be validated!
};

/**
 * Step 2
 * @param topic
 * @param message
 */
let onMessage = async (topic, message) => {

    if (!connectedToMqtt){
        connectedToMqtt = true;
        logger.log('info',"Congrats! you are successfully receiving messages from the MQTT Broker")
    }

    if (!gatewayRxTopicRegex.test(topic)) {
        return;
    }
    // TODO Step 2:
    // We are only interested in the join request packets.
    // Problem is: those packets are encoded... Therefore we need to use a decoder.
    // You need to implement the PacketDecoder code of course!
    // How? RTFM => README.md
    let msgDecoder = new JoinRequestPacketDecoder(topic, message);
    if (!msgDecoder.isSupported()) {
        logger.log('verbose', 'msg received is not a JoinRequest, according to your JoinRequestPacketDecoder#isSupported method ;)')
        return;
    }

    logger.log('verbose',"Join Request identified");
    let decodedJoinRequest = msgDecoder.decode();
    logger.log('verbose',"Decoded:" + JSON.stringify(decodedJoinRequest));

    // Congratulations, you are decoding all the join requests of the LoRa network.
    // However, we want to be smart hackers and only activate your friend's device on the specific APP_EUI
    if (isValidAppEUI(decodedJoinRequest.appEUI) && isRightDeviceEUI(decodedJoinRequest.devEUI)) {
        logger.log('verbose',"AppEUI and DevEUI are valid. Will register device");
        // TODO Step 3:
        // JoinRequest means the device is trying to join the application network.
        // Problem is : The device was never registered in the application network.
        // (It's like a new computer trying to go join a nazily-secured enterprise network
        // and your sysadmin needs to whitelist your computer's mac address).
        // Therefore we want to interact with the LoraServer API.
        // Thanks to your awesome Anonymous friend, you already have a async-client available in api/api.js
        if (!await api.deviceExists(decodedJoinRequest.devEUI)) {
            logger.log('verbose', "Device doesn't exist")
            // help: when using method createDevice from api, do not forget to use "await" (like on the previous line), it is an async method

            // help: you need the devEui from the Decoded JoinRequest.
            //       EVERYTHING else is in the "conf.js" file and you can use the provided "conf" variable. Except "description" field, where you can put anything you want
            //       one more thing... the wisnode your friend is using is also known as a "rak811"...

            // TODO Step 3.1: register your friend's device remotely.
        }
        if (!await api.deviceNwkKeyExists(decodedJoinRequest.devEUI)) {
            logger.log('verbose', "Device Network key doesn't exist")
            // hint: check the beginning of this file, you should find an unused variable you may use here...

            // TODO Step 3.2: set the device Network key (NwkKey).
        }
        logger.log('verbose',"Device registered successfully");
    }
};

/**
 * Check whether the AppEUI of the intercepted message is the one we want to work on
 * @param msgAppEUI string|Uint8Array
 * @returns {boolean}
 */
let isValidAppEUI = (msgAppEUI) => {
    return utils.arraysEqual((typeof msgAppEUI === 'string') ? utils.hexStringToBytes(msgAppEUI) : msgAppEUI, validAppEUI) || utils.arraysEqual((typeof msgAppEUI === 'string') ? utils.hexStringToBytes(msgAppEUI) : msgAppEUI, validMockAppEUI);
};

/**
 * Check whether the DeviceEUI equals the team's device.
 * @param devEUI string|Uint8Array
 * @returns {boolean}
 */
let isRightDeviceEUI = (devEUI) => {
    return utils.arraysEqual((typeof devEUI === 'string') ? utils.hexStringToBytes(devEUI) : devEUI, deviceEUI);
};

init();

let connectedToMqtt = false;
let waiting = 0;
checkMqttConnection = setInterval(() => {
    if (!connectedToMqtt) {
        if (waiting<3){
            waiting++;
            logger.log('info',"waiting for messages from MQTT broker")
        }else{
            logger.log('warn', "you should have received messages from MQTT broker by now, check how you connect to it")
        }
    } else {
        clearInterval(checkMqttConnection)
    }
}, 3000);
