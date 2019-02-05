const Logger = require('../log/logger');
const conf = require('../conf/conf');
const axios = require('axios');

const authHeader = "Client-Authorization";
const logger = Logger.child({service: 'review'});

const client = axios.create({
  baseURL: conf.progressClient.baseUrl,
  headers: {[authHeader]: "Api-Key " + conf.user.progressApiKey}
});

const logError = (e) => {
  let details = e;
  if (e.response) {
    details = `[${e.response.status}] ${e.response.data}`;
  }
  logger.error("Error occured during call to http api", details);
  throw e;
};

/**
 * Request a join request supported challenge from the progress server.
 * @returns {Promise<{id: {number}, content: [{topic: {string}, message: {Buffer}}]}>}
 */
const requestJoinRequestSupportedChallenge = async () => {
  try {
    const response = await client.get(`/api/v1/challenges/joinrequestsupported/client/${conf.user.clientId}`);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logError(e);
  }
};


/**
 * This allows to submit the result of a join request supported challenge to the progress server.
 * @param result {challengeId: {number}, errors: [{string}], content:[{supported: {boolean}}]}
 * @returns {Promise<{done:{boolean}}>}
 */
const submitJoinRequestSupportedChallenge = async (result) => {
  try {
    const response = await client.post(`/api/v1/challenges/joinrequestsupported/${result.challengeId}`, result);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logError(e);
  }
};


/**
 * Request a join request decode challenge from the progress server.
 * @returns {Promise<{id: {number}, content: [{topic: {string}, message: {Buffer}}]}>}
 */
const requestJoinRequestDecodeChallenge = async () => {
  try {
    const response = await client.get(`/api/v1/challenges/joinrequestdecode/client/${conf.user.clientId}`);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logError(e);
  }
};

/**
 * This allows to submit the result of a join request decode challenge to the progress server.
 * @param result
 * @returns {Promise<*>}
 */
const submitJoinRequestDecodeChallenge = async (result) => {
  try {
    const response = await client.post(`/api/v1/challenges/joinrequestdecode/${result.challengeId}`, result);
    logger.debug("Response received", response.data);
    return response.data;
  } catch (e) {
    logError(e);
  }
};


module.exports = {
  requestJoinRequestSupportedChallenge,
  submitJoinRequestSupportedChallenge,
  requestJoinRequestDecodeChallenge,
  submitJoinRequestDecodeChallenge,
};