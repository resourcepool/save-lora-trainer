/**
 * Hi, I'm John Doe.
 * I sniffed the App Server interactions last night (the http traffic was not secured... noobs) and managed to find the right Authentication details.
 * I made a small client for you to use with just a few features.
 * Good luck!
 * @type {string}
 */
const Logger = require('../log/logger');
const conf = require('../conf/conf');
const axios = require('axios');

const authHeader = "Grpc-Metadata-Authorization";
const logger = Logger.child({service: 'review'});

const client = axios.create({
  baseURL: conf.gothamWatchdog.baseUrl,
  headers: {[authHeader]: "Bearer " + conf.gothamWatchdog.authToken}
});


/**
 * Request a join request supported challenge from the watchdog.
 * @returns {Promise<{id: {number}, content: [{topic: {string}, message: {Buffer}}]}>}
 */
const requestJoinRequestSupportedChallenge = async () => {
  try {
    const response = await client.get(`/challenge/joinrequestsupported/${conf.user.deviceEUI}`);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};


/**
 * This allows to submit the result of a join request supported challenge to the watchdog.
 * @param result {challengeId: {number}, errors: [{string}], content:[{supported: {boolean}}]} 
 * @returns {Promise<{done:{boolean}}>}
 */
const submitJoinRequestSupportedChallenge = async (result) => {
  try {
    const response = await client.post(`/challenge/joinrequestsupported/${result.challengeId}`, result);
    logger.debug("Response received", response.data);
    return response;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};


/**
 * Request a join request decode challenge from the watchdog.
 * @returns {Promise<{id: {number}, content: [{topic: {string}, message: {Buffer}}]}>}
 */
const requestJoinRequestDecodeChallenge = async () => {
  try {
    const response = await client.get(`/challenge/joinrequest/${conf.user.deviceEUI}`);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};

/**
 * This allows to submit the result of a join request decode challenge to the watchdog.
 * @param result
 * @returns {Promise<*>}
 */
const submitJoinRequestDecodeChallenge = async (result) => {
  try {
    const response = await client.post('/devices', {device: device});
    logger.debug("Response received", response.data);
    return response;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};


module.exports = {
  requestJoinRequestSupportedChallenge,
  submitJoinRequestSupportedChallenge,
  requestJoinRequestDecodeChallenge,
  submitJoinRequestDecodeChallenge,
};