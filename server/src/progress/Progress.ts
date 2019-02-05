import Step from "./Step";

export default class Progress {
    
    hackerSteps?: Step[];
    geekInDangerSteps?: Step[];
    
    constructor() {
        this.hackerSteps = [
            new Step('brokerConnect'),
            new Step('brokerSubscribe'),
            new Step('joinRequestSupported'),
            new Step('joinRequestDecode'),
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