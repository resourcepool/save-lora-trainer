const Step = require("./Step");

const HACKER_STEP_BROKER_CONNECT = 'brokerConnect';
const HACKER_STEP_BROKER_SUBSCRIBE = 'brokerSubscribe';
const HACKER_STEP_JOIN_REQUEST_SUPPORTED = 'joinRequestSupported';
const HACKER_STEP_JOIN_REQUEST_DECODE = 'joinRequestDecode';

class Progress {
  
  constructor() {
    this.hackerSteps = [
      new Step(HACKER_STEP_BROKER_CONNECT),
      new Step(HACKER_STEP_BROKER_SUBSCRIBE),
      new Step(HACKER_STEP_JOIN_REQUEST_SUPPORTED),
      new Step(HACKER_STEP_JOIN_REQUEST_DECODE),
      new Step('createDevice'),
      new Step('setDeviceNwkKey')
    ];
    this.geekInDangerSteps = [
      new Step('deviceSettingsSet'),
      new Step('joinRequestSent'),
      new Step('pingMessageSent'),
      new Step('deviceActivated'),
    ];
  }
}

module.exports = {
  HACKER_STEP_BROKER_CONNECT,
  HACKER_STEP_BROKER_SUBSCRIBE,
  HACKER_STEP_JOIN_REQUEST_SUPPORTED,
  HACKER_STEP_JOIN_REQUEST_DECODE,
  Progress
};