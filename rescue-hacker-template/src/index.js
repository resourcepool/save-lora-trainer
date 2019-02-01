const api = require('./api/api');
const utils = require('./utils');
const mqtt = require('mqtt');

const JoinRequestPacketDecoder = require('./join-request-packet-decoder');

const RAK811_DEVICE_PROFILE_ID = '1d99a006-e617-4fb3-9ffe-a71567ee36a7';
const LORA_APPLICATION_ID = 1;
const VALID_APP_EUI = utils.hexStringToBytes('42:42:42:42:42:42:42:42');

 /**
 * Step 1
 */
let init = () => {

// TODO Step 1: Connect to the city's remote MQTT Broker
// Those idiots forgot to put any security on it... Noobs!
// You want to listen to all incoming messages
  
};

/**
 * Step 2
 * @param topic
 * @param message
 */
let onMessage = async (topic, message) => {
  // TODO Step 2: 
  // We are only interested in the join request packets.
  // Problem is: those packets are encoded... Therefore we need to use a decoder.
  // You need to implement the PacketDecoder code of course!
  // How? RTFM => README.md
  let msgDecoder = new JoinRequestPacketDecoder(topic, message);
  if (!msgDecoder.isSupported()) {
    return;
  }
  let decodedJoinRequest = msgDecoder.decode();

  // Congratulations, you are decoding all the join requests of the LoRa network.
  // However, we want to be smart hackers and only activate your friend's device on the specific APP_EUI 
  if (isValidAppEUI(decodedJoinRequest.appEUI)) {
    // TODO Step 3:
    // JoinRequest means the device is trying to join the application network.
    // Problem is : The device was never registered in the application network.
    // (It's like a new computer trying to go join a nazily-secured enterprise network 
    // and your sysadmin needs to whitelist your computer's mac address).
    // Therefore we want to interact with the LoraServer API.
    // Thanks to your awesome friend John Doe, you already have a async-client available in api/api.js
    // TODO Step 3.1: register your friend's device remotely.
    // TODO Step 3.2: set the device Network key (NwkKey).
  }
};

/**
 * Check whether the AppEUI of the intercepted message is the one we want to work on
 * @param msgAppEUI
 * @returns {boolean}
 */
let isValidAppEUI = (msgAppEUI) => {
  return utils.arraysEqual(msgAppEUI, VALID_APP_EUI);
};