const api = require('./api/api');
const utils = require('./utils');
const mqtt = require('mqtt');
const conf = require('./conf');
const reviewService = require('./progress/review-service');

const Logger = require('./log/logger');

const JoinRequestPacketDecoder = require('./decoder/JoinRequestPacketDecoder');

const gatewayRxTopicRegex = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");

const validAppEUI = utils.hexStringToBytes(conf.user.appEUI);
const validMockAppEUI = utils.hexStringToBytes(conf.user.mockAppEUI);
const deviceEUI = utils.hexStringToBytes(conf.user.deviceEUI);
const deviceNetworkKey = utils.normalizeHexString(conf.user.nwkKey);

const logger = Logger.child({service: 'index'});
let client;

let init = () => {
  reviewService.init();
  client = mqtt.connect(conf.mqtt.host, {username: conf.mqtt.username, password: conf.mqtt.password, clientId: conf.user.clientId});
  client.on('connect', () => {
    client.subscribe('#', (err) => {
      if (err) {
        process.exit(1);
      }
    });
  });
  client.on("message", onMessage);
};

/**
 * Step 2
 * @param topic
 * @param message
 */
let onMessage = async (topic, message) => {
  if (!gatewayRxTopicRegex.test(topic)) {
    return;
  }

  let msgDecoder = new JoinRequestPacketDecoder(topic, message);
  if (!msgDecoder.isSupported()) {
    return;
  }

  logger.debug("Join Request identified");
  let decodedJoinRequest = msgDecoder.decode();
  logger.debug("Decoded:" + JSON.stringify(decodedJoinRequest));

  // Congratulations, you are decoding all the join requests of the LoRa network.
  // However, we want to be smart hackers and only activate your friend's device on the specific APP_EUI
  if (isValidAppEUI(decodedJoinRequest.appEUI) && isRightDeviceEUI(decodedJoinRequest.devEUI)) {
    logger.debug("AppEUI and DevEUI are valid. Will register device");
    // TODO Step 3:
    // JoinRequest means the device is trying to join the application network.
    // Problem is : The device was never registered in the application network.
    // (It's like a new computer trying to go join a nazily-secured enterprise network
    // and your sysadmin needs to whitelist your computer's mac address).
    // Therefore we want to interact with the LoraServer API.
    // Thanks to your awesome Anonymous friend, you already have a async-client available in api/api.js
    if (!await api.deviceExists(decodedJoinRequest.devEUI)) {
      // TODO Step 3.1: register your friend's device remotely.
    }
    if (!await api.deviceNwkKeyExists(decodedJoinRequest.devEUI)) {
      // TODO Step 3.2: set the device Network key (NwkKey).
    }
    logger.debug("Device registered successfully");
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
 * If you don't implement this right, you might give a head start to all your competitors!
 * @param devEUI string|Uint8Array
 * @returns {boolean}
 */
let isRightDeviceEUI = (devEUI) => {
  return utils.arraysEqual((typeof devEUI === 'string') ? utils.hexStringToBytes(devEUI) : devEUI, deviceEUI);
};

init();
