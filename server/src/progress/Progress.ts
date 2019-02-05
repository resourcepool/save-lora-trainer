import Step from "./Step";

export const HACKER_STEP_BROKER_CONNECT = 'brokerConnect';
export const HACKER_STEP_BROKER_SUBSCRIBE = 'brokerSubscribe';
export const HACKER_STEP_JOIN_REQUEST_SUPPORTED = 'joinRequestSupported';
export const HACKER_STEP_JOIN_REQUEST_DECODED = 'joinRequestDecoded';

export default class Progress {
    
    hackerSteps?: Step[];
    geekInDangerSteps?: Step[];
    
    constructor() {
        this.hackerSteps = [
            new Step(HACKER_STEP_BROKER_CONNECT),
            new Step(HACKER_STEP_BROKER_SUBSCRIBE),
            new Step(HACKER_STEP_JOIN_REQUEST_SUPPORTED),
            new Step(HACKER_STEP_JOIN_REQUEST_DECODED),
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