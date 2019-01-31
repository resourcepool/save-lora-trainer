const mqtt = require('mqtt');
const PacketDecoder = require('./packet-decoder');
const api = require('./api/api');
const utils = require('./utils');

const RAK811_DEVICE_PROFILE_ID = '1d99a006-e617-4fb3-9ffe-a71567ee36a7';
const LORA_APPLICATION_ID = 1;
const LORA_SERVICE_PROFILE_ID = utils.hexStringToBytes('790bb798-d88c-45bd-9e97-0811b57e7bd0');
const LORA_ROUTING_PROFILE_ID = utils.hexStringToBytes('6d5db27e-4ce2-4b2b-b5d7-91f069397978');
const VALID_APP_EUI = utils.hexStringToBytes('42:42:42:42:42:42:42:42');
const client = mqtt.connect('mqtt://5.135.162.148:1883');

client.on('connect', function () {
  client.subscribe("#", function (err) {
  });
});

client.on('message', async function (topic, message) {
  // message is Buffer
  console.log(topic.toString());
  let msg = JSON.parse(message.toString());
  console.log(msg.toString());
  let decoder = new PacketDecoder(msg);
  if (decoder.isJoinRequest()) {
    let result = decoder.decodeJoinRequest();
    if (utils.arraysEqual(result.appEui, VALID_APP_EUI)) {
      await api.createDevice({
          devEUI: utils.bytesToHexString(result.devEui),
          applicationID: LORA_APPLICATION_ID,
          deviceProfileID: RAK811_DEVICE_PROFILE_ID,
          name: "Test",
          description: "Test description"
      });
      await api.setDeviceNwkKey(utils.bytesToHexString(result.devEui), "42424242424242424242424242424242");
    }
  }
});