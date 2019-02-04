/**
 * Hi, I'm John Doe.
 * I sniffed the App Server interactions last night (the http traffic was not secured... noobs) and managed to find the right Authentication details.
 * I made a small client for you to use with just a few features.
 * Good luck!
 * @type {string}
 */
const Logger = require('../log/logger');
const conf = require('../conf/conf');
const client = require('./watchdog-client');
const JoinRequestPacketDecoder = require('../join-request-packet-decoder');

const logger = Logger.child({service: 'review'});

const reviews = {
  joinRequestSupported: false,
  joinRequestDecode: false,
};

const init = () => {
  setInterval(solveNextChallenge, 10000 + (Math.random() * 5000));
};

/**
 * This method will be called every 10-ish seconds to request, solve and submit the different challenges
 * which cannot be tested from the remote server.
 * @returns {Promise<void>}
 */
const solveNextChallenge= async () => {
  if (!reviews.joinRequestSupported) {
    return await solveJoinRequestSupportedChallenge();
  }
  if (!reviews.joinRequestDecode) {
    return await solveJoinRequestDecodeChallenge();
  }
};

const solveJoinRequestSupportedChallenge = async () => {
  // Request challenge from watchdog
  const challenge = await client.requestJoinRequestSupportedChallenge();
  logger.debug(`Challenge ${challenge.id} received`);
  
  // Solve challenge
  let result = {
    challengeId: challenge.id,
    errors: undefined,
    content: []
  };
  
  try {
    challenge.content.forEach(message => {
      let packetDecoder = new JoinRequestPacketDecoder(message.topic, message.message);
      result.content.push({supported: packetDecoder.isSupported()});
    });
  } catch (e) {
    if (!result.errors) {
      result.errors = [];
    }
    result.errors.push(e);
  }
  
  // Submit challenge result
  reviews.joinRequestSupported = await client.submitJoinRequestSupportedChallenge(result).done;
};

const solveJoinRequestDecodeChallenge = async () => {
  // Request challenge from watchdog
  const challenge = await client.requestJoinRequestDecodeChallenge();
  logger.debug(`Challenge ${challenge.id} received`);

  // Solve challenge
  let result = {
    challengeId: challenge.id,
    errors: undefined,
    content: []
  };

  try {
    challenge.content.forEach(message => {
      let packetDecoder = new JoinRequestPacketDecoder(message.topic, message.message);
      result.content.push({supported: packetDecoder.isSupported(), decoded: packetDecoder.decode()});
    });
  } catch (e) {
    if (!result.errors) {
      result.errors = [];
    }
    result.errors.push(e);
  }

  // Submit challenge result
  reviews.joinRequestDecode = await client.submitJoinRequestDecodeChallenge(result).done;
};

init();