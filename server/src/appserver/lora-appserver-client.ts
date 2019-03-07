/**
 * Hi, I'm John Doe.
 * I sniffed the App Server interactions last night (the http traffic was not secured... noobs) and managed to find the right Authentication details.
 * I made a small client for you to use with just a few features.
 * Good luck!
 * @type {string}
 */
import Logger from '../log/logger';
import {config} from '../config';
import axios from 'axios';
import {RegisteredDevices} from "./models/RegisteredDevices";
import {DeviceKeys} from "./models/DeviceKeys";
import {DeviceDescriptor} from "./models/DeviceDescriptor";

const authHeader = "Grpc-Metadata-Authorization";
const logger = Logger.child({service: 'api'});


const client = axios.create({
    baseURL: config.loRaServer.baseUrl,
    headers: {[authHeader]: "Bearer " + config.loRaServer.authToken}
});

/**
 * @param device
 * {
 *     devEUI: {string},
 *     applicationID: {string|number},
 *     deviceProfileID: {string},
 *     name: {string},
 *     description: {string}
 * }
 * @returns {Promise<*>}
 */
export const createDevice = async (device: DeviceDescriptor): Promise<any> => {
    try {
        const response = await client.post<any>(`/devices`, device);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api", e.response.data);
        throw e;
    }
};

/**
 * Check whether deviceNwkKey exists or not
 * @param devEUI {string}
 * @returns {Promise<*>}
 */
export const deviceNwkKeyExists = async (devEUI: string): Promise<any> => {
    try {
        const response = await client.get<any>(`/devices/${devEUI}/keys`);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api", e.response.data);
        throw e;
    }
};

/**
 *
 * @param devEUI {string} hex string
 * @param nwkKey {string} hex string
 * @returns {Promise<*>}
 */
export const updateDeviceNwkKey = async (devEUI: string, nwkKey: string): Promise<any> => {
    try {
        const response = await client.put<any>(`/devices/${devEUI}/keys`, {
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

/**
 * Returns the list of registered devices and their content
 */
export const getRegisteredDevices = async (): Promise<RegisteredDevices> => {
    try {
        const response = await client.get<RegisteredDevices>(`/devices?applicationID=${config.loRaServer.loRaApplicationId}&limit=1000`);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api", e.response.data);
        throw e;
    }
};

/**
 * Get the keys associated with current device
 * @param devEUI {string} hex string
 * @returns {Promise<*>}
 */
export const getKeys = async (devEUI: string): Promise<DeviceKeys> => {
    try {
        const response = await client.get<{deviceKeys: DeviceKeys}>(`/devices/${devEUI}/keys`);
        logger.debug("Response received", response.data);
        return response.data.deviceKeys;
    } catch (e) {
        logger.error("Error occured during call to http api", e);
        throw e;
    }
};
