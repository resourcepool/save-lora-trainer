/**
 * Hi, I'm John Doe.
 * I sniffed the App Server interactions last night (the http traffic was not secured... noobs) and managed to find the right Authentication details.
 * I made a small client for you to use with just a few features.
 * Good luck!
 * @type {string}
 */
const axios = require('axios');
const logger = require('../log/logger');
const AUTH_HEADER = "Grpc-Metadata-Authorization";
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJuYmYiOjAsImV4cCI6MjE0NzQ4MzY0Nywic3ViIjoidXNlciIsInVzZXJuYW1lIjoicm9vdCJ9.GVAd8NMkAZ3axU2flBJ9PbNY_R45tbu-VLLaxWAGwWI";


const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {[AUTH_HEADER]: "Bearer " + JWT}
});

const deviceExists = async (devEUI) => {
  try {
    const response = await client.get(`/devices/${devEUI}`);
    logger.debug("Response received", response.data);
    return response;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};

/**
 * @param device
 * {
 *     devEUI: {hexString},
 *     applicationID: {string|number},
 *     deviceProfileID: {string},
 *     name: {string},
 *     description: {string}
 * }
 * @returns {Promise<*>}
 */
const createDevice = async (device) => {
  try {
    const response = await client.post('/devices', {device: device});
    logger.debug("Response received", response.data);
    return response;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};

/**
 * 
 * @param devEUI {hexString}
 * @param nwkKey {hexString}
 * @returns {Promise<*>}
 */
const setDeviceNwkKey = async (devEUI, nwkKey) => {
  try {
    const response = await client.post(`/devices/${devEUI}/keys`, {
      deviceKeys: {
        devEUI: devEUI,
        nwkKey: nwkKey
      }
    });
    logger.debug("Response received", response.data);
    return response;
  } catch (e) {
    logger.error("Error occured during call to http api", e);
    throw e;
  }
};

module.exports = {
  createDevice,
  setDeviceNwkKey,
  deviceExists
};