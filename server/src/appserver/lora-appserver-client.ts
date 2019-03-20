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
import {ApplicationDescriptor} from "./models/ApplicationDescriptor";


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
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
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
        if (e.response.status === 404) {
            return null;
        }
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
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
        logger.error("Error occured during call to http api ", e.response.data);
        return;
    }
};

/**
 * Returns the list of registered devices and their content
 */
export const getRegisteredDevices = async (): Promise<RegisteredDevices|null> => {
    try {
        const response = await client.get<RegisteredDevices>(`/devices?applicationID=${config.loRaServer.loRaApplicationId}&limit=1000`);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            return null;
        }
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
    }
};

/**
 * Get the keys associated with current device
 * @param devEUI {string} hex string
 * @returns {Promise<*>}
 */
export const getKeys = async (devEUI: string): Promise<DeviceKeys|null> => {
    try {
        const response = await client.get<{deviceKeys: DeviceKeys}>(`/devices/${devEUI}/keys`);
        logger.debug("Response received", response.data);
        return response.data.deviceKeys;
    } catch (e) {
        if (e.response.status === 404) {
            return null;
        }
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
    }
};


/**
 * @param app: {
 *    description: {string},
 *    id: {string},
 *    name: {string},
 *    organizationID: {string},
 *    payloadCodec: {string},
 *    payloadDecoderScript: {string},
 *    payloadEncoderScript: {string},
 *    serviceProfileID: {string}
 *  }
 * @returns {Promise<*>}
 */
export const createApplication = async (app: ApplicationDescriptor): Promise<any> => {
    try {
        const response = await client.post<any>(`/applications`, {application: app});
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
    }
};



/**
 * @param applicationId: {string}
 *
 * @returns {Promise<*>}
 */
export const deleteApplication = async (applicationId: string): Promise<any> => {
    try {
        const response = await client.delete(`/applications/${applicationId}`);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
    }
};

export const deleteDevice = async (d: DeviceDescriptor): Promise<any> => {
    try {
        const response = await client.delete(`/devices/${d.devEUI}`);
        logger.debug("Response received", response.data);
        return response.data;
    } catch (e) {
        logger.error("Error occured during call to http api ", e.response.data);
        return null;
    }
}

