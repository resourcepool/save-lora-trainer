import Step from "./Step";

export const HACKER_STEP_BROKER_CONNECT = 'brokerConnect';
export const HACKER_STEP_BROKER_SUBSCRIBE = 'brokerSubscribe';
export const HACKER_STEP_JOIN_REQUEST_SUPPORTED = 'joinRequestSupported';
export const HACKER_STEP_JOIN_REQUEST_DECODE = 'joinRequestDecode';
export const HACKER_STEP_CREATE_DEVICE = 'createDevice';
export const HACKER_STEP_SET_DEVICE_NWK_KEY = 'setDeviceNwkKey';

export const GEEK_IN_DANGER_STEP_SET_DEVICE_SETTINGS = 'deviceSettingsSet';
export const GEEK_IN_DANGER_STEP_JOIN_REQUEST_SENT = 'joinRequestSent';
export const GEEK_IN_DANGER_STEP_PING_MESSAGE_SENT = 'pingMessageSent';
export const GEEK_IN_DANGER_STEP_GPS_LOCATION_SENT = 'gpsLocationSent';

export default class Progress {

    hackerSteps?: Step[];
    geekInDangerSteps?: Step[];

    constructor() {
        this.hackerSteps = [
            new Step(HACKER_STEP_BROKER_CONNECT),
            new Step(HACKER_STEP_BROKER_SUBSCRIBE),
            new Step(HACKER_STEP_JOIN_REQUEST_SUPPORTED),
            new Step(HACKER_STEP_JOIN_REQUEST_DECODE),
            new Step(HACKER_STEP_CREATE_DEVICE),
            new Step(HACKER_STEP_SET_DEVICE_NWK_KEY)
        ];
        this.geekInDangerSteps = [
            new Step(GEEK_IN_DANGER_STEP_SET_DEVICE_SETTINGS),
            new Step(GEEK_IN_DANGER_STEP_JOIN_REQUEST_SENT),
            new Step(GEEK_IN_DANGER_STEP_PING_MESSAGE_SENT),
            new Step(GEEK_IN_DANGER_STEP_GPS_LOCATION_SENT)
        ];
    }
}
