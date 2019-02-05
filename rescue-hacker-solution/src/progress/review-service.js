/**
 * Hi, I'm John Doe.
 * I sniffed the App Server interactions last night (the http traffic was not secured... noobs) and managed to find the right Authentication details.
 * I made a small client for you to use with just a few features.
 * Good luck!
 * @type {string}
 */
const Logger = require('../log/logger');
const conf = require('../conf/conf');
const client = require('./progress-client');
const JoinRequestPacketDecoder = require('../decoder/JoinRequestPacketDecoder');
const pg = require('./Progress');
const logger = Logger.child({service: 'review'});

let loopCallback;

/**
 * @type {{
 * hackerSteps: [{tag: string, validated: boolean, timestamp: number}],
 * geekInDangerSteps: [{tag: string, validated: boolean, timestamp: number}]
 * }}
 */
let progress = new pg.Progress();

const init = () => {
  loopCallback = setInterval(solveNextChallenge, 10000 + (Math.random() * 5000));
  solveNextChallenge();
};

/**
 * This method will be called every 10-ish seconds to request, solve and submit the different challenges
 * which cannot be tested from the remote server.
 * @returns {Promise<void>}
 */
const solveNextChallenge= async () => {
  progress = await client.getProgress();
  if (!progress.hackerSteps.find(step => step.tag === pg.HACKER_STEP_JOIN_REQUEST_SUPPORTED).validated) {
    return await solveJoinRequestSupportedChallenge();
  }
  if (!progress.hackerSteps.find(step => step.tag === pg.HACKER_STEP_JOIN_REQUEST_DECODE).validated) {
    return await solveJoinRequestDecodeChallenge();
  }
  // If all challenges have been solved, no need to call it anymore.
  clearInterval(loopCallback);
};

const solveJoinRequestSupportedChallenge = async () => {
  // Request challenge from progress client
  const challenge = await client.requestJoinRequestSupportedChallenge();
  logger.debug(`Challenge ${challenge.id} received`);
  
  // Solve challenge
  let result = {
    challengeId: challenge.id,
    errors: undefined,
    content: {messages: []}
  };
  
  try {
    challenge.content.messages.forEach(message => {
      let packetDecoder = new JoinRequestPacketDecoder(message.topic, message.message);
      result.content.messages.push({supported: packetDecoder.isSupported()});
    });
  } catch (e) {
    if (!result.errors) {
      result.errors = [];
    }
    result.errors.push(e);
  }
  
  // Submit challenge result
  let response = await client.submitJoinRequestSupportedChallenge(result);
  reviews.joinRequestSupported = response.done;
};

const solveJoinRequestDecodeChallenge = async () => {
  // Request challenge from progress client
  const challenge = await client.requestJoinRequestDecodeChallenge();
  logger.debug(`Challenge ${challenge.id} received`);

  // Solve challenge
  let result = {
    challengeId: challenge.id,
    errors: undefined,
    content: {messages: []}
  };

  try {
    challenge.content.messages.forEach(message => {
      let packetDecoder = new JoinRequestPacketDecoder(message.topic, message.message);
      result.content.messages.push({supported: packetDecoder.isSupported(), decodedPacket: JSON.stringify(packetDecoder.decode())});
    });
  } catch (e) {
    if (!result.errors) {
      result.errors = [];
    }
    result.errors.push(e);
  }

  // Submit challenge result
  let response = await client.submitJoinRequestDecodeChallenge(result);
  reviews.joinRequestDecode = response.done;
};

module.exports = {
  init
};